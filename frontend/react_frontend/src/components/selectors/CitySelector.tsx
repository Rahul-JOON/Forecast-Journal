
import React, { useState } from "react";
import { Check, ChevronDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface CitySelectorProps {
  cities: string[];
  selectedCity: string;
  onSelect: (city: string) => void;
  className?: string;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  cities,
  selectedCity,
  onSelect,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (city: string) => {
    onSelect(city);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full glass-morphism px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <MapPin size={16} className="mr-2 text-neon-blue" />
          <span>{selectedCity}</span>
        </div>
        <ChevronDown
          size={16}
          className={cn(
            "transition-transform",
            isOpen ? "transform rotate-180" : ""
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full max-h-56 overflow-auto glass-morphism rounded-lg py-1 animate-fade-in">
          <ul className="py-1" role="listbox">
            {cities.map((city) => (
              <li
                key={city}
                role="option"
                aria-selected={city === selectedCity}
                onClick={() => handleSelect(city)}
                className={cn(
                  "flex items-center justify-between px-4 py-2 cursor-pointer text-sm",
                  city === selectedCity
                    ? "bg-white/10 text-neon-blue"
                    : "text-gray-300 hover:bg-white/5"
                )}
              >
                <span>{city}</span>
                {city === selectedCity && (
                  <Check size={16} className="text-neon-blue" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CitySelector;
