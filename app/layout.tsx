import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | Salón privado`,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={cn(
          bodyFont.variable,
          displayFont.variable,
          "font-sans text-foreground",
        )}
      >
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
