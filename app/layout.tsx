import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Informatik an der ESG",
  description: "Informatik an der Elisabeth-Selbert-Gesamtschule Bonn",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#171717",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://prod.spline.design" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          as="fetch"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" forcedTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
