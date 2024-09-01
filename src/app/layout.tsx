"use client"
import type * as React from "react"
import { Toaster } from "react-hot-toast"

import { NextUIProvider } from "@nextui-org/react"
import { Roboto_Slab, Nunito, Inter } from "next/font/google"

import "../styles/main.css"
// eslint-disable-next-line import/order
import { Provider } from "react-redux"

import store from "./store/index"

const robotoFont = Roboto_Slab({
  variable: "--roboto-font",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

const nunitoFont = Nunito({
  variable: "--nunitoFont",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

const interFont = Inter({
  variable: "--interFont",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})
interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <body
            className={`${interFont.className} ${robotoFont.className} ${nunitoFont.className}`}
          >
            <main>
              <NextUIProvider>
                <Toaster position="bottom-left" />
                {children}
              </NextUIProvider>
            </main>
          </body>
        </head>
      </html>
    </Provider>
  )
}

export default RootLayout
