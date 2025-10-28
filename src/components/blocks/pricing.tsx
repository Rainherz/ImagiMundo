"use client";

import { useState } from "react";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Switch } from "@/components/ui/8bit/switch";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Gratis",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    description: "Acceso básico para crear y compartir cuentos",
    features: [
      "Acceso a editor básico",
      "Guardar hasta 3 historias",
      "Compartir en clase",
    ],
  },
  {
    name: "Escolar",
    monthlyPrice: "$8",
    yearlyPrice: "$6",
    features: [
      "Todas las funciones del plan Gratis",
      "Asistente de escritura IA",
      "Formatos multimedia (audio/video)",
      "Historias interactivas para el aula",
      "Gestión de clases y progreso",
      "Soporte educativo prioritario",
    ],
  },
  {
    name: "Institucional",
    monthlyPrice: "$20",
    yearlyPrice: "$15",
    features: [
      "Todas las funciones del plan Escolar",
      "Integración con bibliotecas y redes educativas",
      "Soporte y despliegue dedicado",
      "Acceso a material curricular y eventos",
    ],
  },
];

export const Pricing = ({ className }: { className?: string }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Planes y precios
          </h2>
          <p className="text-muted-foreground mx-auto leading-snug text-balance">
            Imagi Mundo ofrece un plan gratuito para empezar en el aula y planes
            pensados para escuelas,
            recursos multimedia y soporte educativo.
          </p>
        </div>

        <div className="mt-8 grid items-start gap-10 text-start md:mt-12 md:grid-cols-3 lg:mt-20">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`${
                plan.name === "Startup"
                  ? "outline-primary origin-top outline-4"
                  : ""
              }`}
            >
              <CardContent className="flex flex-col gap-7 px-6 py-5">
                <div className="space-y-2">
                          <h3 className="text-foreground font-semibold">{plan.name}</h3>
                          <div className="space-y-1">
                            <div className="text-muted-foreground text-lg font-medium">
                              {isAnnual ? plan.yearlyPrice : plan.monthlyPrice}{" "}
                              {plan.name !== "Gratis" && (
                                <span className="text-muted-foreground">
                                  por usuario/{isAnnual ? "año" : "mes"}
                                </span>
                              )}
                            </div>
                          </div>
                </div>

                {plan.name !== "Gratis" ? (
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={isAnnual}
                      onCheckedChange={() => setIsAnnual(!isAnnual)}
                      aria-label="Toggle annual billing"
                    />
                    <span className="text-sm font-medium">Facturación anual</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">
                    {plan.description}
                  </span>
                )}

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="text-muted-foreground flex items-center gap-1.5"
                    >
                      <Check className="size-5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-fit"
                  variant={plan.name === "Escolar" ? "default" : "outline"}
                >
                  Comenzar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
