import {Button, Card, DataTable, EmptyState, Heading, Layout, Page, Toast, Frame} from "@shopify/polaris";
import {ResourcePicker, TitleBar} from "@shopify/app-bridge-react";
import {useCallback, useMemo, useState} from "react";

export default function ProductPickerPage() {
    const [pickerOpen, setPickerOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [showToast, setShowToast] = useState(false);

    const productTableDisplayData = useMemo(() => products.map((p) => [
        // p.id,
        p.title,
        <img src={p.images[0].originalSrc} alt="" style={{width: '29px'}}/>
    ]), [products]);

    const redirectFunc = () => {window.location.replace('https://studio.stylescan.com/');}

    const submitHandler = useCallback(() => {
        console.log('Submitting');
        setShowToast(true);
        redirectFunc();
    }, []);



    const toastMarkup = showToast
        ? <Toast
            content='Submitted Successful'
            onDismiss={() => setShowToast(false)}
            duration={4000}
        />
        : null

    return (
        <Frame>
            <Page>
                <TitleBar
                    title="Select Products"
                    primaryAction={{
                        content: "Select Products",
                        onAction: () => {
                            console.log("Select", pickerOpen);
                            setPickerOpen(true);
                        },
                    }}
                />
                <Layout>
                    <ResourcePicker
                        resourceType='Product'
                        open={pickerOpen}
                        onSelection={(resources) => {
                            console.log('picker', resources);
                            setProducts(resources.selection);
                            setPickerOpen(false);
                        }}
                        onCancel={() => setPickerOpen(false)}
                    />
                    <Layout.Section>
                        <Card sectioned>
                            <Heading>Selected Products</Heading>
                            {productTableDisplayData.length
                                ? <DataTable
                                    columnContentTypes={['text', 'text']}
                                    headings={['Title', 'Picture']}
                                    rows={productTableDisplayData}
                                />
                                : <EmptyState heading={'No products selected'}/>
                            }
                        </Card>
                        <Card sectioned>
                            <Button
                                primary
                                onClick={submitHandler}
                                disabled={!products.length}
                            >Submit</Button>
                        </Card>
                    </Layout.Section>
                </Layout>
                {toastMarkup}
            </Page>
        </Frame>
    );
}
