
import React from "react";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  fullWidth?: boolean;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  description,
  children,
  className,
  style,
  fullWidth = false,
}) => {
  return (
    <div
      className={cn(
        "glass-morphism rounded-xl overflow-hidden flex flex-col",
        fullWidth ? "w-full" : "w-full md:w-[calc(50%-12px)]",
        className
      )}
      style={style}
    >
      <div className="p-4 border-b border-white/10">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        {description && <p className="text-gray-400 text-sm">{description}</p>}
      </div>
      <div className="p-4 flex-grow">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
