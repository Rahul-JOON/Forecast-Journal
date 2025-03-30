
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadDataButtonProps {
  onClick: () => void;
  isLoading: boolean;
  className?: string;
}

const LoadDataButton: React.FC<LoadDataButtonProps> = ({
  onClick,
  isLoading,
  className
}) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={isLoading}
      className={cn(
        "glass-morphism px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-colors border-none",
        className
      )}
    >
      <RefreshCw 
        size={16} 
        className={cn(
          "mr-2", 
          isLoading ? "animate-spin text-primary-purple" : "text-neon-blue"
        )} 
      />
      {isLoading ? "Loading..." : "Load Data"}
    </Button>
  );
};

export default LoadDataButton;
