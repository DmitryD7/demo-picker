import {Frame, TopBar} from '@shopify/polaris';
import Logo from '../assets/Black.png'
import {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function TopNavBar() {
    const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);
    const toggleIsSecondaryMenuOpen = useCallback(() => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen), [],);
    const redirectFunc = () => {
        window.location.replace('https://studio.stylescan.com/');
    }
    const navigate= useNavigate();

    const logo = {
        width: 124,
        topBarSource: Logo,
        // url: 'https://stylescan.com',
        accessibilityLabel: 'StyleScan',
    };

    const secondaryMenuMarkup = (<TopBar.Menu
        activatorContent={
            <span style={{fontSize: '20px', marginRight: '17px', marginLeft: '17px'}}>
          Navigation
        </span>
        }
        open={isSecondaryMenuOpen}
        onOpen={toggleIsSecondaryMenuOpen}
        onClose={toggleIsSecondaryMenuOpen}
        actions={[{
            items: [
                {content: 'Signup to StyleScan', url: 'https://stylescan.com/subscribe/apparel/'},
                {content: 'Login to StyleScan', url: 'https://studio.stylescan.com/'},
                {content: 'Pick products', onAction() {
                    navigate('/productPickerPage')
                    }}
            ],
        },]}
    />);

    const topBarMarkup = (<TopBar
        secondaryMenu={secondaryMenuMarkup}
    />);

    return (<div style={{height: '61px'}}>
        <Frame topBar={topBarMarkup} logo={logo} />
    </div>);
}