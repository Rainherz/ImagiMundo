import Image from "next/image";
import Link from "next/link";

import Marquee from "react-fast-marquee";

import { cn } from "@/lib/utils";

type Company = {
  name: string;
  logo: string;
  width: number;
  height: number;
  href: string;
};

const topRowCompanies: Company[] = [
  {
    name: "Biblioteca Nacional",
    logo: "/logos/logo-bnp.png",
    width: 160,
    height: 32,
    href: "",
  },
  {
    name: "Museo Regional",
    logo: "/logos/museo.svg",
    width: 150,
    height: 32,
    href: "https://museoregional.example",
  },
  {
    name: "Escuelas Públicas",
    logo: "/logos/ie.png",
    width: 140,
    height: 28,
    href: "https://escuelas.example",
  },
  {
    name: "Fundación Cultural",
    logo: "/logos/fundacion.svg",
    width: 150,
    height: 30,
    href: "https://fundacioncultural.example",
  },
];

const bottomRowCompanies: Company[] = [
  {
    name: "Editorial Local",
    logo: "/logos/editorial.svg",
    width: 140,
    height: 28,
    href: "https://editorial.example",
  },
  {
    name: "Centro de Arte",
    logo: "/logos/centro-arte.svg",
    width: 130,
    height: 28,
    href: "https://centrodearte.example",
  },
  {
    name: "Red de Bibliotecas",
    logo: "/logos/mvll-b.png",
    width: 150,
    height: 30,
    href: "https://redbibliotecas.example",
  },
  {
    name: "Festival del Cuento",
    logo: "/logos/concurso.png",
    width: 160,
    height: 34,
    href: "https://festivalcuento.example",
  },
  {
    name: "Universidad Local",
    logo: "/logos/unsa-logo.png",
    width: 140,
    height: 30,
    href: "https://universidad.example",
  },
];

export const Logos = () => {
  return (
    <section className="pb-28 lg:pb-32 overflow-hidden">
      <div className="container space-y-10 lg:space-y-16">
        <div className="text-center">
          <h2 className="mb-4 text-xl text-balance md:text-2xl lg:text-3xl">
            Impulsando la creatividad literaria y la identidad regional.
            {/* <br className="max-md:hidden" />
            <span className="text-muted-foreground">
              Colaboramos con escuelas, bibliotecas y organizaciones culturales.
            </span> */}
          </h2>
        </div>

        <div className="flex w-full flex-col items-center gap-8">
          {/* Top row - 4 logos (partners educativos/culturales) */}
          <LogoRow companies={topRowCompanies} gridClassName="grid-cols-4" />

          {/* Bottom row - 5 logos (colaboradores y eventos) */}
          <LogoRow
            companies={bottomRowCompanies}
            gridClassName="grid-cols-5"
            direction="right"
          />
        </div>
      </div>
    </section>
  );
};

type LogoRowProps = {
  companies: Company[];
  gridClassName: string;
  direction?: "left" | "right";
};

const LogoRow = ({ companies, gridClassName, direction }: LogoRowProps) => {
  return (
    <>
      {/* Desktop static version */}
      <div className="hidden md:block">
        <div
          className={cn(
            "grid items-center justify-items-center gap-x-20 lg:gap-x-28",
            gridClassName,
          )}
        >
          {companies.map((company, index) => (
            <Link href={company.href} target="_blank" key={index}>
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                width={company.width}
                height={company.height}
                className="dark:opacity/100 object-contain opacity-50 transition-opacity hover:opacity-70 dark:invert"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile marquee version */}
      <div className="md:hidden">
        <Marquee direction={direction} pauseOnHover>
          {companies.map((company, index) => (
            <Link
              href={company.href}
              target="_blank"
              key={index}
              className="mx-8 inline-block transition-opacity hover:opacity-70"
            >
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                width={company.width}
                height={company.height}
                className="object-contain"
              />
            </Link>
          ))}
        </Marquee>
      </div>
    </>
  );
};
