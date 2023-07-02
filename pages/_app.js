import "../styles/globals.css"
import en from "../lang/en.json"
import ua from "../lang/ua.json"
import { IntlProvider } from "react-intl"
import { useRouter } from "next/router"
import Layout from "../components/UI/Layout/Layout"
import Head from "next/head"
import "moment/locale/uk"
import "moment/locale/en-sg"

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { AnimatePresence } from "framer-motion"
import ErrorBoundary from "../components/Common/ErrorBoundary"
import { AppContextProvider } from "../context/AppContext"

import poster_img from "/public/poster.jpg"
import { initGA, logPageView } from "../utils/gtag"
import { useEffect } from "react"

const messages = { en, ua }

export default function App({ Component, pageProps }) {
    const { locale, pathname, events } = useRouter()


    const isBottom = (el) => {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    const trackScrolling = () => {
        const wrappedElement = document.getElementById('body');
        const uaWidgetDivs = document.getElementsByClassName("huww-widget huww-widget-bottom-left");
        if (isBottom(wrappedElement)) {
            for (let el of uaWidgetDivs) {
                el.style.display = "none"
            }
        } else {
            for (let el of uaWidgetDivs) {
                el.style.display = "block"
            }
        }
    };

    useEffect(() => {
        const handleRouteChange = () => {
            logPageView()
            // fbPageView()
        }
        events.on("routeChangeComplete", handleRouteChange)
        return () => {
            events.off("routeChangeComplete", handleRouteChange)
        }
    }, [events])

    useEffect(() => {
        document.addEventListener('scroll', trackScrolling);
        return () => {
            document.removeEventListener('scroll', trackScrolling);
        }
    }, [])

    useEffect(() => {
        initGA()
        logPageView()
    }, [])

    return (
        <>
            <IntlProvider locale={locale} messages={messages[locale]}>
                <AppContextProvider>
                    <Layout>
                        <Head>
                            <title>electroperedachi</title>
                            <meta
                                name="description"
                                content="Ukrainian electronic music label"
                            />
                            <meta
                                name="viewport"
                                content="initial-scale=1.0, width=device-width"
                            />
                            <meta
                                property="og:image"
                                content={poster_img.src}
                            />
                            <script
                                id="help-ukraine-win"
                                async="true"
                                src="https://helpukrainewinwidget.org/cdn/widget.js"
                                data-type="two"
                                data-position="bottom-left"
                            />
                            <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s)
                            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                            n.queue=[];t=b.createElement(e);t.async=!0;
                            t.src=v;s=b.getElementsByTagName(e)[0];
                            s.parentNode.insertBefore(t,s)}(window, document,'script',
                            'https://connect.facebook.net/en_US/fbevents.js');
                            fbq('init', '573414703062456');
                            fbq('track', 'PageView');` }}
                            />
                            <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none"
                            src="https://www.facebook.com/tr?id=573414703062456&ev=PageView&noscript=1" />` }}
                            />
                        </Head>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <AnimatePresence
                                initial={false}
                                exitBeforeEnter={true}
                            >
                                <ErrorBoundary>
                                    <div id="body">
                                        <Component {...pageProps} key={pathname} />
                                    </div>
                                </ErrorBoundary>
                            </AnimatePresence>
                        </LocalizationProvider>
                    </Layout>
                </AppContextProvider>
            </IntlProvider>
        </>
    )
}
