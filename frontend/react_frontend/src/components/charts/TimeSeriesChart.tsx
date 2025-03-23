
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

interface TimeSeriesChartProps {
  data: Array<{
    time: string;
    hour: number;
    actual: number;
    predicted: number;
    error: number;
  }>;
  className?: string;
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data, className }) => {
  const [selectedInterval, setSelectedInterval] = useState<'6h' | '24h' | '3d' | '7d'>('24h');

  // Filter data based on selected interval
  const getFilteredData = () => {
    const hoursBack = {
      '6h': 6,
      '24h': 24,
      '3d': 72,
      '7d': 168,
    }[selectedInterval];
    
    return data.slice(0, hoursBack);
  };

  const filteredData = getFilteredData();

  // Format x-axis time labels
  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);
    
    if (selectedInterval === '6h') {
      return date.getHours() + ':00';
    }
    
    if (selectedInterval === '24h') {
      return date.getHours() + ':00';
    }
    
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:00`;
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      return (
        <div className="neo-blur p-2 rounded-md text-sm">
          <p className="text-gray-300 font-medium">{formattedDate}</p>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex justify-between items-center mt-1">
              <span className="mr-2" style={{ color: entry.color }}>
                {entry.name}:
              </span>
              <span className="font-medium">{entry.value}°C</span>
            </div>
          ))}
          
          {payload[0] && payload[1] && (
            <div className="mt-2 pt-2 border-t border-white/10">
              <div className="flex justify-between">
                <span className="text-neon-magenta">Error:</span>
                <span className="font-medium text-neon-magenta">
                  {(Number(payload[1].value) - Number(payload[0].value)).toFixed(1)}°C
                </span>
              </div>
            </div>
          )}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className={className}>
      <div className="mb-4 flex justify-center space-x-2">
        {['6h', '24h', '3d', '7d'].map((interval) => (
          <button
            key={interval}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              selectedInterval === interval
                ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                : 'text-gray-400 bg-white/5 hover:bg-white/10'
            }`}
            onClick={() => setSelectedInterval(interval as any)}
          >
            {interval}
          </button>
        ))}
      </div>
      
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={filteredData}
          margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="time" 
            tickFormatter={formatXAxis} 
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
            domain={['dataMin - 2', 'dataMax + 2']}
            label={{ 
              value: 'Temperature (°C)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fill: 'rgba(255,255,255,0.7)', fontSize: 12 }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36}
            wrapperStyle={{ paddingTop: '10px' }}
          />
          <Line 
            type="monotone" 
            dataKey="actual" 
            name="Actual"
            stroke="#00FFFF" 
            dot={false}
            strokeWidth={2}
            activeDot={{ r: 6, strokeWidth: 0, fill: '#00FFFF' }}
            className="neon-blue-glow"
          />
          <Line 
            type="monotone" 
            dataKey="predicted" 
            name="Predicted"
            stroke="#FF00FF" 
            dot={false}
            strokeWidth={2}
            activeDot={{ r: 6, strokeWidth: 0, fill: '#FF00FF' }}
            strokeDasharray="5 5"
            className="neon-magenta-glow"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeSeriesChart;
