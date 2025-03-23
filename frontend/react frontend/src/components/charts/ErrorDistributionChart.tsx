
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ErrorDistributionChartProps {
  data: Array<{
    error: number;
    count: number;
  }>;
  className?: string;
}

const ErrorDistributionChart: React.FC<ErrorDistributionChartProps> = ({ data, className }) => {
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="neo-blur p-2 rounded-md text-sm">
          <p className="text-gray-300 font-medium">Error: {label}°C</p>
          <p className="text-neon-mint font-medium">Count: {payload[0].value}</p>
        </div>
      );
    }
    
    return null;
  };

  // Custom bar color based on error value
  const getBarColor = (error: number) => {
    if (error < -2) return "#FF00FF"; // Magenta for large negative errors
    if (error > 2) return "#FF00FF"; // Magenta for large positive errors
    if (error >= -1 && error <= 1) return "#00FF9D"; // Mint for small errors
    return "#00FFFF"; // Blue for moderate errors
  };

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="error" 
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
            label={{ 
              value: 'Forecast Error (°C)', 
              position: 'insideBottom', 
              offset: -5,
              style: { textAnchor: 'middle', fill: 'rgba(255,255,255,0.7)', fontSize: 12 }
            }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
            label={{ 
              value: 'Frequency', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fill: 'rgba(255,255,255,0.7)', fontSize: 12 }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="count" 
            isAnimationActive={true}
            animationDuration={1500}
            className="neon-mint-glow"
          >
            {data.map((entry, index) => (
              <rect
                key={`rect-${index}`}
                x={0}
                y={0}
                width={0}
                height={0}
                fill={getBarColor(entry.error)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ErrorDistributionChart;
