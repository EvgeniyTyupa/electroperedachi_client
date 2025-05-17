import "../styles/globals.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
import { CLARITY_PROJECT_ID, FB_PIXEL, TIKTOK_PIXEL } from "../utils/constants"

import Script from 'next/script'

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

            import('tiktok-pixel')
            .then(module => module.default)
            .then(TiktokPixel => {
                TiktokPixel.init(TIKTOK_PIXEL)
                TiktokPixel.pageView() 
            })

            import('react-facebook-pixel')
            .then(module => module.default)
            .then(ReactPixel => {
                // ReactPixel.init('573414703062456')
                ReactPixel.init(FB_PIXEL)
                ReactPixel.pageView()
            })
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

    useEffect(() => {
        import('react-facebook-pixel')
        .then(module => module.default)
        .then(ReactPixel => {
            // ReactPixel.init('573414703062456')
            ReactPixel.init(FB_PIXEL)
            ReactPixel.pageView()
        })

        import('tiktok-pixel')
        .then(module => module.default)
        .then(TiktokPixel => {
            TiktokPixel.init(TIKTOK_PIXEL)
            TiktokPixel.pageView() 
        })

        import('@microsoft/clarity')
        .then((mod) => {
            const Clarity = mod.default
            Clarity.init(CLARITY_PROJECT_ID)
        })
        .catch((err) => {
            console.error('Clarity init failed', err)
        })
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
                                content="Ukranian Techno Movement | Music Label | Freedom. Equality. Techno. | Join us raver!"
                            />
                            <meta
                                name="viewport"
                                content="initial-scale=1.0, width=device-width"
                            />
                            <meta
                                property="og:image"
                                content={poster_img.src}
                            />
                            {/* <script
                                id="help-ukraine-win"
                                async="true"
                                src="https://helpukrainewinwidget.org/cdn/widget.js"
                                data-type="two"
                                data-position="bottom-left"
                            /> */}
                            <Script
                                id="microsoft-clarity"
                                strategy="afterInteractive"
                                dangerouslySetInnerHTML={{
                                __html: `
                                    (function(c,l,a,r,i,t,y){
                                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                                    })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
                                `,
                                }}
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
