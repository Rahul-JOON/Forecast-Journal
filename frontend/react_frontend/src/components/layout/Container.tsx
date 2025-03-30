
import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  className,
  maxWidth = "xl"
}) => {
  const maxWidthClass = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full"
  }[maxWidth];

  return (
    <div className={cn(
      "w-full mx-auto px-4 sm:px-6 md:px-8", 
      maxWidthClass,
      className
    )}>
      {children}
    </div>
  );
};

export default Container;
