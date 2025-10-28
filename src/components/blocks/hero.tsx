import {
  ArrowRight,
  Blend,
  ChartNoAxesColumn,
  CircleDot,
  Diamond,
} from "lucide-react";

import { DashedLine } from "@/components/dashed-line";
import { Button } from "@/components/ui/8bit/button";
import Link from "next/link";

const features = [
  {
    title: "Asistente de escritura",
    description: "Guías y sugerencias para construir suspenso y giros narrativos.",
    icon: CircleDot,
  },
  {
    title: "Formatos multimedia",
    description: "Videos narrados por IA, imágenes y formatos dinámicos.",
    icon: Blend,
  },
  {
    title: "Historias interactivas",
    description: "Decisiones en la trama y finales alternativos.",
    icon: ChartNoAxesColumn,
  },
  {
    title: "Cultura y glosario",
    description: "Recomendaciones locales y vocabulario para enriquecer relatos.",
    icon: Diamond,
  },
];

export const Hero = () => {
  return (
    <section className="translate-x-16 lex justify-center py-28 lg:pt-44">
      <div className="container flex flex-col justify-between gap-8 md:gap-14 lg:flex-row lg:gap-20">
        {/* Left side - Main content */}
        <div className="flex-1">
          <h1 className="text-foreground max-w-160 text-3xl tracking-tight md:text-4xl lg:text-5xl ">
            Imagi Mundo
          </h1>

          <p className="text-muted-foreground text-1xl mt-5 md:text-3xl">
            Crea historias increibles y personalizadas junto a tus niños listas en solo 30 segundos
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-10 lg:flex-nowrap">
            <Button asChild>
              <Link href="/app">
                Empieza Ahora 
              </Link>
            </Button>
            <Button
              variant="outline"
              className="from-background h-auto gap-2 bg-linear-to-r to-transparent shadow-md"
              asChild
            >
              <Link
                href="/docs"
                className="max-w-56  flex  gap-2 truncate text-start md:max-w-none"
              >
                Aprende Más 
                <ArrowRight className="stroke-3" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right side - Features */}
        <div className="relative flex items-center flex-1 flex-col justify-center space-y-5 max-lg:pt-10 lg:pl-10">
          <DashedLine
            orientation="vertical"
            className="absolute top-0 left-0 max-lg:hidden"
          />
          <DashedLine
            orientation="horizontal"
            className="absolute top-0 lg:hidden"
          />
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex gap-2.5 lg:gap-5">
                <Icon className="text-foreground mt-1 size-4 shrink-0 lg:size-5" />
                <div>
                  <h2 className="font-text text-foreground font-semibold">
                    {feature.title}
                  </h2>
                  <p className="text-muted-foreground max-w-96 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* <div className="mt-12 max-lg:ml-6 max-lg:h-[550px] max-lg:overflow-hidden md:mt-20 lg:container lg:mt-24">
        <div className="relative h-[793px] w-full">
          <Image
            src="/hero.webp"
            alt="hero"
            fill
            className="rounded-2xl object-cover object-left-top shadow-lg max-lg:rounded-tr-none"
          />
        </div>
      </div> */}
    </section>
  );
};
