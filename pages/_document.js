import { Html, Head, Main, NextScript } from 'next/document'
import { GTM_ID } from '../utils/constants'

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          id="hotjar"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj = h.hj || function(){(h.hj.q = h.hj.q || []).push(arguments)};
                h._hjSettings = { hjid: 2742746, hjsv: 6 };
                a = o.getElementsByTagName('head')[0];
                r = o.createElement('script'); r.async = 1;
                r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
                a.appendChild(r);
              })(window, document, 'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      </Head>
      <body>
         <noscript>
          <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
          />
      </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
