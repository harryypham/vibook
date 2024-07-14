import { Inter } from "next/font/google"
import "./globals.css"
import { SupabaseProvider } from "@/providers/SupabaseProvider"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ViBook",
  description: "Vietnamese Book Sharing Platform",
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <SupabaseProvider>
          <Suspense>{children}</Suspense>
        </SupabaseProvider>
      </body>
    </html>
  )
}
