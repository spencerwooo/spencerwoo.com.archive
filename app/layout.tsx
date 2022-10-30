import { Inter } from '@next/font/google'
import Avatar from '../components/Avatar'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.className}>
      <head>
        <title>Spencer Woo</title>
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
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className="bg-slate-50">
        <header className="-mb-32 text-center">
          <Avatar />
          <h1 className="text-xl font-bold text-slate-900 mt-6">Spencer Woo</h1>
          <Nav />
        </header>

        <main className="bg-white max-w-3xl mx-auto p-4 pt-40 rounded-xl">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
