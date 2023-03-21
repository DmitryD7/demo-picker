import React, {useState} from 'react';
import {Card, DescriptionList, Frame, Layout, Navigation} from "@shopify/polaris";
import Logo from '../assets/Black.png'
import {BehaviorMajor, CustomerPlusMajor, EnterMajor, QuestionMarkInverseMajor} from '@shopify/polaris-icons';
import ProductPickerPage from "./ProductPickerPage";

export default function Index() {
    const [activeMainSection, setActiveMainSection] = useState('Instructions');

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
                        onClick: () => setActiveMainSection('Instructions'),
                    },
                    {
                        url: '/productPickerPage',
                        exactMatch: true,
                        label: 'Select products',
                        icon: BehaviorMajor,
                        onClick: () => setActiveMainSection('Product selector'),
                    }
                ]}
                separator
            />
            <Navigation.Section
                title={'ACCOUNT'}
                items={[
                    {
                        url: 'https://studio.stylescan.com/',
                        excludePaths: ['#'],
                        label: 'Log in',
                        icon: EnterMajor,
                    },
                    {
                        url: 'https://stylescan.com/subscribe/apparel/',
                        excludePaths: ['#'],
                        label: 'Sign up',
                        icon: CustomerPlusMajor,
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
                        <Card title={activeMainSection} sectioned={true}>
                            {activeMainSection === 'Product selector' &&<ProductPickerPage/>}
                            {activeMainSection === 'Instructions' && infoComponent()}
                        </Card>
                    </div>
                </Layout.Section>
            </Layout>
        </Frame>
    </div>)
}
