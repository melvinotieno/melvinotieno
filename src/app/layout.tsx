import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import { BASE_URL } from "@/utilities/constants";

import Footer from "./footer";
import Header from "./header";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Melvin Otieno",
    template: "%s | Melvin Otieno",
  },
  description: "Software Developer with a passion for building things.",
  authors: [{ name: "Melvin Otieno", url: BASE_URL }],
  keywords: ["software", "developer", "melvin", "otieno"],
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Melvin Otieno",
    locale: "en_US",
  },
  twitter: {
    site: "@o_melvinotieno",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <header className="my-12 font-mono">
          <Container>
            <Header />
          </Container>
        </header>

        <main className="my-12 flex-1">
          <Container>{children}</Container>
        </main>

        <footer className="my-12 font-mono">
          <Container>
            <Footer />
          </Container>
        </footer>

        <Analytics />

        <SpeedInsights />
      </body>
    </html>
  );
}

function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="sm:px-8">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="relative px-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
