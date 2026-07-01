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
import { CLARITY_PROJECT_ID, FB_PIXEL, TIKTOK_PIXEL, GTM_ID } from "../utils/constants"

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

    // Инициализация пикселей — СТРОГО один раз за всё время жизни вкладки.
    // Раньше это дублировалось ещё одним отдельным useEffect ниже — убрано,
    // потому что повторный ReactPixel.init() на каждый маунт + на каждый
    // routeChangeComplete создавал гонку и задваивал события.
    useEffect(() => {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
            event: 'pageview',
            page: window.location.pathname,
        })

        import('react-facebook-pixel')
            .then(module => module.default)
            .then(ReactPixel => {
                ReactPixel.init(FB_PIXEL)
                ReactPixel.pageView()
            })

        import('tiktok-pixel')
            .then(module => module.default)
            .then(TiktokPixel => {
                TiktokPixel.init(TIKTOK_PIXEL)
                TiktokPixel.pageView()
            })

        initGA()
        logPageView()

        // import('@microsoft/clarity')
        // .then((mod) => {
        //     const Clarity = mod.default
        //     Clarity.init(CLARITY_PROJECT_ID)
        // })
        // .catch((err) => {
        //     console.error('Clarity init failed', err)
        // })
    }, [])

    // На смену роута — ТОЛЬКО pageView(), без повторного init().
    // Пиксель уже инициализирован выше, повторный init не нужен.
    useEffect(() => {
        const handleRouteChange = () => {
            logPageView()

            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({
                event: 'pageview',
                page: window.location.pathname,
            })

            import('tiktok-pixel')
                .then(module => module.default)
                .then(TiktokPixel => {
                    TiktokPixel.pageView()
                })

            import('react-facebook-pixel')
                .then(module => module.default)
                .then(ReactPixel => {
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

    return (
        <>
            <Script id="gtm-script" strategy="afterInteractive">
                {`
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${GTM_ID}');
                `}
            </Script>
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