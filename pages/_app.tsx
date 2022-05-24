import '@fontsource/dm-serif-text'
import '@fontsource/ia-writer-mono'
import '@fontsource/inter'
import 'katex/dist/katex.min.css'
import { ThemeProvider } from 'next-themes'
import NextNProgress from 'nextjs-progressbar'

import type { AppProps } from 'next/app'
import Script from 'next/script'

import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
      />
      <Script id="ga-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}');
        `}
      </Script>

      <Layout>
        <NextNProgress
          height={1}
          color="rgb(156, 163, 175, 0.9)"
          options={{ showSpinner: false }}
        />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
