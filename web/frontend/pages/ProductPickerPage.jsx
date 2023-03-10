import {Button, Card, DataTable, EmptyState, Frame, Heading, Layout, Page, Toast} from "@shopify/polaris";
import {ResourcePicker} from "@shopify/app-bridge-react";
import {useCallback, useMemo, useState} from "react";

export default function ProductPickerPage() {
    const [pickerOpen, setPickerOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [doHaveStudio, setDoHaveStudio] = useState(true);

    const productTableDisplayData = useMemo(() => products.map((p) => [
        // p.id,
        p.title,
        <img src={p.images[0].originalSrc} alt="" style={{width: '29px'}}/>
    ]), [products]);

    const redirectFunc = () => {
        window.location.replace('https://studio.stylescan.com/');
    };

    const submitHandler = useCallback(() => {
        console.log('Submitting', products);
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
                {/*<TitleBar*/}
                {/*    title="Select Products"*/}
                {/*    primaryAction={{*/}
                {/*        content: "Select Products",*/}
                {/*        onAction: () => {*/}
                {/*            console.log("Select", pickerOpen);*/}
                {/*            setPickerOpen(true);*/}
                {/*        },*/}
                {/*    }}*/}
                {/*/>*/}
                <Button primary onClick={() => setPickerOpen(true)}>Select Products</Button>
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
                                disabled={!products.length || !doHaveStudio}
                            >Submit</Button>
                            {!doHaveStudio &&
                                <div>
                                    <span style={{color: "red"}}>You do not have StyScan Studio. For more info mange your acc!</span>
                                </div>}
                        </Card>
                    </Layout.Section>
                </Layout>
                {toastMarkup}
            </Page>
        </Frame>
    );
}
