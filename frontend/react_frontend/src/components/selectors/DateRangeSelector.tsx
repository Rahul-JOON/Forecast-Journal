
import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangeSelectorProps {
  startDate: Date;
  endDate: Date;
  onDateRangeChange: (startDate: Date, endDate: Date) => void;
  className?: string;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  startDate,
  endDate,
  onDateRangeChange,
  className
}) => {
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);

  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      // If selected start date is after current end date, adjust end date
      const newEndDate = date > endDate ? date : endDate;
      onDateRangeChange(date, newEndDate);
      setIsStartDateOpen(false);
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (date) {
      // If selected end date is before current start date, adjust start date
      const newStartDate = date < startDate ? date : startDate;
      onDateRangeChange(newStartDate, date);
      setIsEndDateOpen(false);
    }
  };

  const presets = {
    today: { label: "Today", days: 0 },
    yesterday: { label: "Yesterday", days: 1 },
    last7Days: { label: "Last 7 Days", days: 7 },
    last30Days: { label: "Last 30 Days", days: 30 },
    thisMonth: { 
      label: "This Month", 
      custom: true,
      getRange: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        return { start, end: now };
      }
    },
    lastMonth: { 
      label: "Last Month", 
      custom: true,
      getRange: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const end = new Date(now.getFullYear(), now.getMonth(), 0);
        return { start, end };
      }
    }
  };

  const handleSelectPreset = (presetKey: string) => {
    const preset = (presets as any)[presetKey];
    let newStartDate: Date;
    let newEndDate: Date = new Date();
    
    if (preset.custom) {
      const range = preset.getRange();
      newStartDate = range.start;
      newEndDate = range.end;
    } else {
      newStartDate = new Date();
      newStartDate.setDate(newEndDate.getDate() - preset.days);
    }
    
    onDateRangeChange(newStartDate, newEndDate);
  };

  return (
    <div className={cn("flex flex-col sm:flex-row gap-2", className)}>
      <div className="flex items-center gap-2">
        <span className="text-gray-400 text-sm whitespace-nowrap">From:</span>
        <Popover open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="glass-morphism px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-colors border-none flex items-center justify-between w-full sm:w-auto"
            >
              <CalendarIcon size={16} className="mr-2 text-neon-mint" />
              <span>{format(startDate, "MMM d, yyyy")}</span>
              <ChevronDown
                size={16}
                className={cn(
                  "ml-2 transition-transform",
                  isStartDateOpen ? "transform rotate-180" : ""
                )}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="glass-morphism p-0 border-none" align="start">
            <div className="p-2 bg-[#121212] border border-gray-800 rounded-lg">
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(presets).map(([key, preset]) => (
                    <Button
                      key={key}
                      variant="outline"
                      className="text-sm text-gray-300 hover:bg-white/10"
                      onClick={() => handleSelectPreset(key)}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateSelect}
                  initialFocus
                  className="p-3 pointer-events-auto bg-[#0a0a0a] rounded-lg"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-gray-400 text-sm whitespace-nowrap">To:</span>
        <Popover open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="glass-morphism px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-colors border-none flex items-center justify-between w-full sm:w-auto"
            >
              <CalendarIcon size={16} className="mr-2 text-neon-mint" />
              <span>{format(endDate, "MMM d, yyyy")}</span>
              <ChevronDown
                size={16}
                className={cn(
                  "ml-2 transition-transform",
                  isEndDateOpen ? "transform rotate-180" : ""
                )}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="glass-morphism p-0 border-none" align="start">
            <div className="p-2 bg-[#121212] border border-gray-800 rounded-lg">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={handleEndDateSelect}
                disabled={(date) => date < startDate}
                initialFocus
                className="p-3 pointer-events-auto bg-[#0a0a0a] rounded-lg"
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DateRangeSelector;
