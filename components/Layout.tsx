import Head from 'next/head'

import Footer from './Footer'
import Navbar from './Navbar'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Head>
      <meta name="description" content="Spencer Woo" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
    </Head>

    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mt-8 flex-1 flex flex-col justify-center">
        {children}
      </main>
      <Footer />
    </div>
  </>
)
export default Layout
