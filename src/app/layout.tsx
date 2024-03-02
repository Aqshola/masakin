import type { Metadata, Viewport } from "next";
import { Inter, Poppins, Ubuntu } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Provider from "@/components/wrapper/layout/Provider";
import Head from "next/head";

const poppinsFont = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const APP_NAME = "Masakin";
const APP_DEFAULT_TITLE = "Masakin";
const APP_TITLE_TEMPLATE = "%s - Masakin";
const APP_DESCRIPTION = "Cari resep yang kamu makan";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#fa9d31",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <Head>
        <></>
      </Head>
      <body
        className={clsx(
          poppinsFont.className,
          "max-w-screen-2xl mx-auto min-h-screen relative"
        )}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
