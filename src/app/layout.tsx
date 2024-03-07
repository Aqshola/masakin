import type { Metadata, Viewport } from "next";
import { Inter, Poppins, Ubuntu } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Provider from "@/components/wrapper/layout/Provider";
import Head from "next/head";
import { eventGenerateMetadata } from "@/utils/client/event";

const poppinsFont = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = eventGenerateMetadata();

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
