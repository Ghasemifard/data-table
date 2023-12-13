import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Montserrat } from "next/font/google";

import "./globals.css";
import { ReactQueryProvider } from "./common/ReactQueryProvider";

const interFont = Inter({ subsets: ["latin"] });
const montserratFont = Montserrat({
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Data Table App",
  description: "data table that show users informations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={montserratFont.className}>{children}</body>
      </html>
    </ReactQueryProvider>
  );
}
