import {Layout, Page,} from "@shopify/polaris";
import WelcomePage from "./WelcomePage.jsx";

export default function HomePage() {
    return (
        <Page narrowWidth>
            <Layout>
                <Layout.Section>
                    <WelcomePage/>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
