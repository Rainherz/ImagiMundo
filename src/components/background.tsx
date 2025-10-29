import React from "react";

import { cn } from "@/lib/utils";
import { Card } from "./ui/8bit/card";

type BackgroundProps = {
  children: React.ReactNode;
  variant?: "top" | "bottom";
  className?: string;
  asChild?: boolean;
};

export const Background = ({
  children,
  variant = "top",
  className,
  asChild,
}: BackgroundProps) => {
  const Comp = asChild ? "div" : Card;

  return (
    <Comp
      className={cn(
        "relative ",
        variant === "top" &&
          "from-primary/50 via-background to-background/80  bg-linear-to-b via-20%",
        variant === "bottom" &&
          "from-background via-background to-primary/50  bg-linear-to-b",
        asChild ? "" : "p-8 md:p-12 lg:p-16",
        className
      )}
    >
      {children}
    </Comp>
  );
};
