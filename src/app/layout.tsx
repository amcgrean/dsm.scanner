import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Rajdhani } from "next/font/google";
import { RegisterServiceWorker } from "@/components/RegisterServiceWorker";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DSM Scanner",
  description: "Live Des Moines police, fire & EMS scanner audio.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DSM Scanner",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a18",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${rajdhani.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        {children}
        <RegisterServiceWorker />
      </body>
    </html>
  );
}
