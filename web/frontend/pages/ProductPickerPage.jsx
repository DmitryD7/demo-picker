import {Button, Card, DataTable, EmptyState, Heading, Layout, Page, Toast} from "@shopify/polaris";
import {ResourcePicker} from "@shopify/app-bridge-react";
import {useMemo, useState} from "react";

export default function ProductPickerPage() {
    const [pickerOpen, setPickerOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [showToast, setShowToast] = useState(false);
    // const navigate = useNavigate();

    const productTableDisplayData = useMemo(() => products.map((p) => [
        // p.id,
        p.title,
        <img src={p.images[0].originalSrc} alt={p.title} style={{width: '29px'}}/>
    ]), [products]);

    const emptySelectedProductsList = () => {
        setProducts([]);
    };

    const redirectFunc = () => {
        const params = new URLSearchParams();
        const images = products.map(pr => pr.images[0].originalSrc);
        for (const img of images) {
            params.append('import', img);
        }
        const fullUrl = `https://studio.stylescan.com/?${params.toString()}`;
        // const redirectUri = encodeURIComponent(fullUrl);
        // console.log('redirectUri: ', redirectUri)
        // window.location.href = `/exit-iframe?redirectUri=${fullUrl}`;
        // navigate(`https://studio.stylescan.com/?${params.toString()}`, {target: "new"});
        // window.open(fullUrl, '_blank');
    };

    const submitHandler = () => {
        setShowToast(true);
        redirectFunc();
    };

    const toastMarkup = showToast
        ? <Toast
            content='Submitted Successful'
            onDismiss={() => setShowToast(false)}
            duration={4000}
        />
        : null

    return (
        <Page>
            <div style={{marginBottom: '11px'}}>
                <Button primary onClick={() => setPickerOpen(true)}>Select Products</Button>
            </div>
            <Layout>
                <ResourcePicker
                    resourceType='Product'
                    open={pickerOpen}
                    onSelection={(resources) => {
                        setProducts([...resources.selection, ...products]);
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
                    {products.length > 0 && <div style={{margin: '11px 0'}}>
                        <Button
                            primary
                            onClick={emptySelectedProductsList}
                        >Empty list</Button>
                    </div>}
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
    );
}
