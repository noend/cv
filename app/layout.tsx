import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { userProfile } from "@/data/user-profile";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: userProfile.name + " - " + userProfile.title,
  keywords: [userProfile.name, userProfile.title, userProfile.location],
  description:
    "CV of " +
    userProfile.name +
    " - " +userProfile.title +
    " based in " +
    userProfile.location,
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth md:scroll-pt-20">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  )
}
