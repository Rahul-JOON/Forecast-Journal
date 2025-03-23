
import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  contentClassName?: string;
  fullHeight?: boolean;
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  children,
  className,
  titleClassName,
  subtitleClassName,
  contentClassName,
  fullHeight = false,
}) => {
  return (
    <section
      id={id}
      className={cn(
        "w-full py-16 md:py-24",
        fullHeight && "min-h-screen flex flex-col justify-center",
        className
      )}
    >
      {(title || subtitle) && (
        <div className="mb-10 md:mb-16 text-center animate-fade-in-up">
          {title && (
            <h2 className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight",
              "bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80",
              titleClassName
            )}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className={cn(
              "text-lg md:text-xl text-gray-400 max-w-2xl mx-auto",
              subtitleClassName
            )}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className={cn("w-full", contentClassName)}>
        {children}
      </div>
    </section>
  );
};

export default Section;
