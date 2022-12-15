import {Layout, Page,} from "@shopify/polaris";
import {TitleBar} from "@shopify/app-bridge-react";
import ProductPickerPage from "./ProductPickerPage";

export default function HomePage() {
    return (
        <Page narrowWidth>
            <TitleBar title="Product Picker" primaryAction={null}/>
            <Layout>
                <Layout.Section>
                    <ProductPickerPage/>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
