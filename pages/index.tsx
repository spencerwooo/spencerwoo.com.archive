import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../components/Footer'
import Main from '../components/Main'
import Navbar from '../components/Navbar'

const Home: NextPage = () => (
  <>
    <Head>
      <title>Spencer Woo</title>
      <meta name="description" content="Spencer Woo" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Head>

    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Main />
      <Footer />
    </div>
  </>
)

export default Home
