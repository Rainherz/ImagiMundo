import Image from "next/image";
import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/8bit/card";
import { DashedLine } from "../dashed-line";

const items = [
  {
    title: "Asistente de escritura IA",
    image: "/features/ia-asistent.png",
  },
  {
    title: "Formatos multimedia",
    image: "/features/multimedia.png",
  },
  {
    title: "Historias interactivas",
    image: "/features/rutas.png",
  },
];

export const Features = () => {
  return (
    <section id="feature-modern-teams" className="pb-28 lg:pb-32">
      <div className="container">
        {/* Top dashed line with text */}
        <div className="relative flex items-center justify-center">
          <DashedLine className="text-muted-foreground" />
          <span className="bg-muted text-muted-foreground absolute px-3 font-mono text-sm font-medium tracking-wide max-md:hidden">
            Inspira, aprende y crea en comunidad.
          </span>
        </div>

        {/* Content */}
        <div className="mx-auto mt-10 grid px-20 items-center gap-3 md:gap-0 lg:mt-24 lg:grid-cols-2">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Hecho para crear cuentos memorables y tradicionales
          </h2>
          <p className="text-muted-foreground leading-snug">
            Plataforma educativa que guía a estudiantes en la creación de
            cuentos inspirados en la cultura local, usando recursos multimedia e
            inspiración en la cultura local.
          </p>
        </div>

        {/* Features Card */}
        <Card className="mt-8  md:mt-12 lg:mt-20">
          <CardContent className="flex p-0 max-md:flex-col">
            {items.map((item, i) => (
              <div key={i} className="flex flex-1 max-md:flex-col">
                <div className="flex-1 p-4 pe-0! md:p-6">
                  <div className="relative aspect-[1.28/1] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={`${item.title} interface`}
                      fill
                      className="object-cover object-top-left ps-4 pt-2"
                    />
                    <div className="from-background absolute inset-0 z-10 bg-linear-to-t via-transparent to-transparent" />
                  </div>

                  <Link
                    href="#"
                    className={
                      "group flex items-center justify-between gap-4 pe-4 pt-4 md:pe-6 md:pt-6"
                    }
                  >
                    <h3 className="font-display max-w-60 text-xl leading-tight font-bold tracking-tight">
                      {item.title}
                    </h3>
                    <div className="rounded-full border p-2">
                      <ChevronRight className="size-6 transition-transform group-hover:translate-x-1 lg:size-9" />
                    </div>
                  </Link>
                </div>
                {i < items.length - 1 && (
                  <div className="relative hidden md:block">
                    <DashedLine orientation="vertical" />
                  </div>
                )}
                {i < items.length - 1 && (
                  <div className="relative block md:hidden">
                    <DashedLine orientation="horizontal" />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
