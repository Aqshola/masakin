import type { Metadata } from "next";
import { Inter, Poppins, Ubuntu } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Provider from "@/components/wrapper/layout/Provider";

const inter = Inter({ subsets: ["latin"] });
const ubuntuFont = Ubuntu({
  variable: "--font-ubuntu",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const poppinsFont = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Masakin",
  description: "Generative Recipe APp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
