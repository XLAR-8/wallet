import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tools app",
  description:
    "This is an AI tools repository.",
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <div className="flex flex-col justify-between w-full h-full min-h-screen">
            <Header />
            <main className="flex-auto w-full max-w-8xl px-4 py-4 mx-auto sm:px-6 md:py-6">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html >
  )
}



