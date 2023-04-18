import React, {useState} from 'react';
import {Card, DescriptionList, Frame, Layout, Navigation} from "@shopify/polaris";
import Logo from '../assets/Black.png'
import {BehaviorMajor, CustomerPlusMajor, EnterMajor, QuestionMarkInverseMajor} from '@shopify/polaris-icons';
import ProductPickerPage from "./ProductPickerPage";

export default function Index() {
    const [activeMainSection, setActiveMainSection] = useState('Instructions');
    const [urlForOutside, setUrlForOutside] = useState('');
    const [isOutside, setIsOutside] = useState(false);

    console.log('activeMainSection', activeMainSection);
    console.log('urlForOutside', urlForOutside);

    const sideNav = () => {
        return (<Navigation
            location="/"
            style={{backgroundColor: 'white'}}
        >
            <img src={Logo} alt="" style={{width: '150px', marginBottom: '15px'}}/>
            <Navigation.Section
                title={'APPLICATION'}
                items={[
                    {
                        url: 'none',
                        label: 'Instructions',
                        icon: QuestionMarkInverseMajor,
                        onClick: () => {
                            setActiveMainSection('Instructions');
                            setIsOutside(false);
                        },
                    },
                    {
                        url: '/productPickerPage',
                        exactMatch: true,
                        label: 'Select products',
                        icon: BehaviorMajor,
                        onClick: () => {
                            setActiveMainSection('ProductSelector');
                            setIsOutside(false);
                        },
                    },
                    {
                        // url: '/outsidePage',
                        // exactMatch: true,
                        label: 'Studio',
                        icon: BehaviorMajor,
                        onClick: () => setActiveMainSection('OutsidePage'),
                    }
                ]}
                separator
            />
            <Navigation.Section
                title={'ACCOUNT'}
                items={[
                    {
                        // url: 'https://studio.stylescan.com/',
                        // url: '/outsidePage',
                        // excludePaths: ['#'],
                        label: 'Log in',
                        icon: EnterMajor,
                        onClick: () => {
                            setActiveMainSection('OutsidePage');
                            setUrlForOutside('https://studio.stylescan.com/');
                            setIsOutside(true);
                        },
                    },
                    {
                        // url: 'https://account.stylescan.com/signup',
                        // url: '/outsidePage',
                        // excludePaths: ['#'],
                        label: 'Sign up',
                        icon: CustomerPlusMajor,
                        onClick: () => {
                            setActiveMainSection('OutsidePage');
                            setUrlForOutside('https://account.stylescan.com/signup');
                            setIsOutside(true);
                        },
                    }
                    ,]}
            />
        </Navigation>);
    };

    const infoComponent = () => {
        return (<DescriptionList
            spacing={'loose'}
            items={[{
                term: 'Step 1', description: 'You must be logged in or create a free account to use StyleScan tool.'
            }, {
                term: 'Step 2', description: 'Select products that you would like to change.'
            }, {
                term: 'Step 3', description: 'Import list of selected products to StyleScan tool.'
            }]}
        />);
    };

    return (<div style={{height: '100vh', width: '100vw', position: 'absolute', left: '3%'}}>
        <Frame>
            <Layout>
                <div style={{height: '100vh'}}>
                    {sideNav()}
                </div>
                <Layout.Section>
                    <div style={{width: '91%', backgroundColor: 'inherit'}}>
                        {!isOutside && <Card title={activeMainSection} sectioned={true}>
                                {activeMainSection === 'ProductSelector' && <ProductPickerPage/>}
                                {activeMainSection === 'Instructions' && infoComponent()}
                            </Card>
                        }
                        {!!urlForOutside && activeMainSection === 'OutsidePage'
                            && <div style={{width: '100%', height: '100vh'}}>
                                <iframe src={urlForOutside} frameborder="0" width="100%" height='100%'></iframe>
                            </div>
                        }
                    </div>
                </Layout.Section>
            </Layout>
        </Frame>
    </div>)
}
