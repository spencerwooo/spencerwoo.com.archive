import { Inter } from '@next/font/google'
import Link from 'next/link'
import Avatar from '../components/Avatar'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={inter.className}>
      <head>
        <title>Spencer Woo</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className="p-4 text-rosepine-base dark:text-rosepine-text dark:bg-rosepine-base flex flex-col min-h-screen max-w-3xl mx-auto">
        <header className="mt-12 flex">
          <Link href="/">
            <Avatar size={5} />
          </Link>
          <div className="ml-8 grow">
            <h1 className="font-bold text-xl">Spencer Woo</h1>
            <Nav />
          </div>
        </header>

        <main className="mt-12 grow">{children}</main>

        <Footer />
      </body>
    </html>
  )
}
