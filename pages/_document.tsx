import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
          <meta name="yandex-verification" content="0e58b02c4e2ae496" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="manifest" href="/site.webmanifest"/>
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d55b5b"/>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=[Tracking ID]"
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(75081823, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
        `,
            }}
          />
          <noscript dangerouslySetInnerHTML={{
            __html: '<div><img src="https://mc.yandex.ru/watch/75081823" style="position:absolute; left:-9999px;" alt="" /></div>'
          }}/>
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1285136815270257');
fbq('track', 'PageView');
`,
            }}
          />
          <noscript dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none"
                           src="https://www.facebook.com/tr?id=1285136815270257&ev=PageView&noscript=1"
            />`
          }}/>
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
