import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/auth-context";
import { AdminBadge } from "@/components/ui/admin-badge";
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
  metadataBase: new URL("https://albecabrera.github.io/robotic"),
  title: {
    default: "Informatik an der ESG",
    template: "%s · ESG Informatik",
  },
  description: "Materialien, Projekte und Lernvideos für den Informatikunterricht bei Herrn Cabrera an der Elisabeth-Selbert-Gesamtschule Bonn.",
  keywords: ["Informatik", "ESG Bonn", "Programmieren", "Schule", "Python", "Java", "Scratch"],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "ESG Informatik",
    title: "Informatik an der ESG Bonn",
    description: "Materialien, Projekte und Lernvideos für den Informatikunterricht bei Herrn Cabrera an der Elisabeth-Selbert-Gesamtschule Bonn.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Informatik an der ESG Bonn",
    description: "Materialien, Projekte und Lernvideos für den Informatikunterricht bei Herrn Cabrera.",
  },
  robots: { index: false, follow: false },
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
          <AuthProvider>
            {children}
            <AdminBadge />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
