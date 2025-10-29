import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "ImagiMundo — Cuentos personalizados y multimedia",
  description:
    "Imagi Mundo: plataforma educativa para crear cuentos de suspense con IA, formatos multimedia e inspiración cultural local.",
  keywords: [
    "cuentos",
    "educación",
    "IA",
    "literatura",
    "suspense",
    "historias interactivas",
    "cultura local",
  ],
  authors: [{ name: "Imagi Mundo", url: "https://imagimundo.aihostu.app" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="light" style={{ colorScheme: "light" }}>
        <head>
          <NextTopLoader />
          <link rel="icon" href="/icon.png" sizes="any" />
        </head>
      <body className="retro antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >

          <Providers>{children}</Providers>
          <Toaster richColors expand />
        </ThemeProvider>
      </body>
    </html>
  );
}
