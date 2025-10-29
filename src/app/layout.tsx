import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/sonner";

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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  openGraph: {
    title: "ImagiMundo — Cuentos personalizados y multimedia",
    description:
      "Crea cuentos de suspense con giros narrativos, audio y vídeo generados por IA, y enriquece las historias con elementos culturales locales.",
    url: "https://imagimundo.aihostu.app/",
    siteName: "ImagiMundo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Imagi Mundo - Cuentos con IA",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ImagiMundo — Cuentos personalizados y multimedia",
    description:
      "Plataforma educativa para crear cuentos de suspense con IA y recursos culturales.",
    images: ["/og-image.png"],
    site: "@ImagiMundo",
  },
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
