import { Inter } from 'next/font/google'
import '@/scss/basics/index.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'r3f gallery',
  description: 'Generated to test',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-layout="app">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
