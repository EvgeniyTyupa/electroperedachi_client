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
import { FB_PIXEL } from "../utils/constants"

import Script from 'next/script'
import { ttqInit } from "../utils/tikTokTracker";

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
        ttqInit();
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
                                id="tiktok-pixel"
                                strategy="afterInteractive"
                                dangerouslySetInnerHTML={{
                                __html: `
                                    !function (w, d, t) {
                                    w.TiktokAnalyticsObject = t;
                                    var ttq = w[t] = w[t] || [];
                                    ttq.methods = ["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
                                    ttq.setAndDefer = function(t,e){ t[e] = function(){ t.push([e].concat(Array.prototype.slice.call(arguments,0))); } };
                                    for (var i = 0; i < ttq.methods.length; i++) {
                                        ttq.setAndDefer(ttq, ttq.methods[i]);
                                    }
                                    ttq.instance = function(i){ var e = ttq._i[i] || []; for(var n = 0; n < ttq.methods.length; n++){
                                        ttq.setAndDefer(e, ttq.methods[n]);
                                    } return e; };
                                    ttq.load = function(id, opt){
                                        var u = "https://analytics.tiktok.com/i18n/pixel/events.js";
                                        ttq._i = ttq._i || {}; ttq._i[id] = []; ttq._i[id]._u = u;
                                        ttq._t = ttq._t || {}; ttq._t[id] = +new Date;
                                        ttq._o = ttq._o || {}; ttq._o[id] = opt || {};
                                        var s = document.createElement("script");
                                        s.type = "text/javascript"; s.async = true;
                                        s.src = u + "?sdkid=" + id + "&lib=" + t;
                                        var x = document.getElementsByTagName("script")[0];
                                        x.parentNode.insertBefore(s, x);
                                    };
                                    ttq.load('D08U1CRC77U9CBHGPIKG'); // ← ваш пиксель-ID
                                    ttq.page();
                                    }(window, document, 'ttq');
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
