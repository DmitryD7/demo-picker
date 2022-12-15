import {BrowserRouter} from "react-router-dom";
import {AppBridgeProvider, PolarisProvider, QueryProvider,} from "./components";
import Routes from "./Routes.jsx";

export default function App() {
    // Any .tsx or .jsx files in /pages will become a route
    // See documentation for <Routes /> for more info
    const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
    console.log(pages)

    return (
        <PolarisProvider>
            <BrowserRouter>
                <AppBridgeProvider>
                    <QueryProvider>
                        <Routes pages={pages}/>
                    </QueryProvider>
                </AppBridgeProvider>
            </BrowserRouter>
        </PolarisProvider>
    );
}
