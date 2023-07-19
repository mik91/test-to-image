// import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Text to image',
  description: 'Text to image with an AI',
}

export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={inter.className}>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                {children}
            </main>
        </body>
    </html>
  )
}
