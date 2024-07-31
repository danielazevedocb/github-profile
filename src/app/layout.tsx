import type { Metadata } from 'next'
import { Open_Sans, Roboto } from 'next/font/google'
import './globals.scss'
import Header from '../components/Header'
import Loading from './loanding'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Github Profile',
  description: 'DEV2DEV',
}

const openSans = Open_Sans({
  subsets: ['cyrillic'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-open-sans',
})

const roboto = Roboto({
  subsets: ['cyrillic'],
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${roboto.variable}`}>
        <Header />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  )
}
