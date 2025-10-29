import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Footer() {
  const navigation = [
    { name: "Características", href: "/#feature-modern-teams" },
    { name: "Sobre nosotros", href: "/about" },
    { name: "Planes", href: "/pricing" },
    { name: "Preguntas frecuentes", href: "/faq" },
    { name: "Contacto", href: "/contact" },
  ];

  const social = [
    { name: "X (Twitter)", href: "https://x.com/imagimundo" },
    { name: "LinkedIn", href: "https://linkedin.com/company/imagimundo" },
  ];

  const legal = [
    { name: "Política de privacidad", href: "/privacy" },
    { name: "Términos de uso", href: "/terms" },
  ];

  return (
    <footer className="flex flex-col items-center gap-14 pt-28 lg:pt-32">
      <div className="container space-y-3 text-center">
        <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
          Crea y comparte cuentos con Imagi Mundo
        </h2>
        <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
          Transforma ideas en cuentos de suspense: utiliza el asistente de
          escritura con IA, genera imágenes y videos para complementar tus
          relatos y conecta con la cultura local.
        </p>
        <div>
          <Button size="lg" className="mt-4" asChild>
            <a href="/app">Comenzar gratis</a>
          </Button>
        </div>
      </div>

      <nav className="container flex flex-col items-center gap-4">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="font-medium transition-opacity hover:opacity-75"
              >
                {item.name}
              </Link>
            </li>
          ))}
          {social.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-0.5 font-medium transition-opacity hover:opacity-75"
              >
                {item.name} <ArrowUpRight className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {legal.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-muted-foreground text-sm transition-opacity hover:opacity-75"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container text-center text-muted-foreground text-sm mt-6">
        © {new Date().getFullYear()} Imagi Mundo. Todos los derechos reservados.
      </div>
    </footer>
  );
}
