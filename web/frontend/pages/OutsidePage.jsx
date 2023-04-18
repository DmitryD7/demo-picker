import {Modal, useAppBridge, useNavigate} from "@shopify/app-bridge-react";
import {Redirect} from "@shopify/app-bridge/actions";
import {useEffect, useState} from "react";

function OutsidePage(props) {

    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (window.top === window.self) {
    //         window.location.href = props.url;
    //         console.log('window.top === window.self')
    //     } else {
    //         console.log('redirect')
    //         // If the current window is the 'child', change the parent's URL with postMessage
    //         const redirect = Redirect.create(app);
    //         redirect.dispatch(Redirect.Action.REMOTE, props.url);
    //     }
    // }, [app]);

    return (
        <div style={{width: '100%', height: '100vh'}}>
            <iframe src={!!props.url ? props.url : 'https://studio.stylescan.com/'} frameBorder="0" width="100%" height='100%'></iframe>
        </div>
    );
}

export default OutsidePage;