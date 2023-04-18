import {Layout, Page,} from "@shopify/polaris";
import WelcomePage from "./WelcomePage.jsx";
import {useEffect} from "react";
import {useAppBridge} from "@shopify/app-bridge-react";
import {Redirect} from "@shopify/app-bridge/actions";

export default function HomePage() {
    // const app = useAppBridge();
    //
    // useEffect(() => {
    //     if (app) {
    //         const redirect = Redirect.create(app);
    //         redirect.dispatch(Redirect.Action.ADMIN_PATH, '/apps/demo-picker');
    //     }
    // }, [app]);

    return (
        <Page>
            <Layout>
                <Layout.Section>
                    <WelcomePage/>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
