import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import './globals.css'
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from '@/providers/modal-provider'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Ticket System',
  description: 'Ticket System',
}

export default async function RootLayout({children,}: { children: React.ReactNode}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          <ModalProvider />
          {children}
        </body>
      </html>
    </SessionProvider>
  )
}
