import '../styles/globals.css'
import en from "../lang/en.json";
import ua from "../lang/ua.json";
import { IntlProvider } from "react-intl";
import { useRouter } from 'next/router';
import Layout from '../components/UI/Layout/Layout';
import Head from 'next/head';
import 'moment/locale/uk'
import 'moment/locale/en-sg'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AnimatePresence } from 'framer-motion';
import ErrorBoundary from '../components/Common/ErrorBoundary';
import { AppContextProvider } from '../context/AppContext';

import poster_img from "/public/poster.jpeg"

const messages = { en, ua }

export default function App({ Component, pageProps }) {
  const { locale, pathname } = useRouter();

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <AppContextProvider>
        <Layout>
          <Head>
            <title>electroperedachi</title>
            <meta name='description' content='Ukrainian electronic music label' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            <meta property="og:image" content={poster_img.src}/>
          </Head>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <AnimatePresence initial={false} exitBeforeEnter={true}>
              <ErrorBoundary>
                <Component {...pageProps} key={pathname}/>
              </ErrorBoundary>
            </AnimatePresence>
          </LocalizationProvider>
        </Layout>
      </AppContextProvider>
    </IntlProvider>
  )
}
