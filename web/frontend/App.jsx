import {BrowserRouter, Route} from "react-router-dom";
import {AppBridgeProvider, PolarisProvider, QueryProvider,} from "./components";
import Routes from "./Routes.jsx";

export default function App() {
    const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

    return (
        <PolarisProvider>
            <BrowserRouter>
                <AppBridgeProvider>
                    <QueryProvider>
                        {/*<TopNavBar/>*/}
                        <Routes pages={pages}/>
                    </QueryProvider>
                </AppBridgeProvider>
            </BrowserRouter>
        </PolarisProvider>
    );
}
