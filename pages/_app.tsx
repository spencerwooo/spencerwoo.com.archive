import '../styles/globals.css'
import 'windi.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const p5Script = document.createElement('script')
    p5Script.setAttribute('id', 'p5Script')
    p5Script.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js')
    document.getElementsByTagName('head')[0].appendChild(p5Script)

    return () => {
      if (p5Script) {
        p5Script.remove()
      }
    }
  }, [])

  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
