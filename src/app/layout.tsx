import "@/styles/globals.css"

import { GeistSans } from "geist/font/sans"
import { type Metadata } from "next"
import { NextUIProvider } from "@nextui-org/react"

export const metadata: Metadata = {
  title: "Personalised Travel Itenary generator",
  description:
    "personalized travel itineraries based on user preferences, such as budget, interests, and trip duration",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  )
}
