import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tousif Portfolio',
  description: 'Full Stack Developer crafting scalable applications with React, Node.js, and modern web technologies.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
