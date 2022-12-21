import {BrowserRouter} from "react-router-dom";
import {AppBridgeProvider, PolarisProvider, QueryProvider,} from "./components";
import Routes from "./Routes.jsx";
import {useEffect, useState} from "react";
import TopNavBar from "./components/TopNavBar.jsx";

export default function App() {
    const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
    const [isRedirect, setIsRedirect] = useState(false);
    const redirectFunc = () => {
        window.location.replace('https://studio.stylescan.com/');
    }
    console.log('PAGES:  ', pages)

    useEffect(() => {
        const isRedirectRes = fetch('https://stylescan.com/account/debug.json').then((r) => {
            console.log('APP UseEffect', r)
            setIsRedirect(r.ok)
        });
    }, []);

    // useEffect(() => {
    //     isRedirect ? redirectFunc() : null
    // }, [isRedirect])


    return (
        <PolarisProvider>
            <BrowserRouter>
                <AppBridgeProvider>
                    <QueryProvider>
                        <TopNavBar/>
                        <Routes pages={pages}/>
                    </QueryProvider>
                </AppBridgeProvider>
            </BrowserRouter>
        </PolarisProvider>
    );
}
