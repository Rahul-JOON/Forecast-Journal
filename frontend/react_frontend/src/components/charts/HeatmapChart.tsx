
import React, { useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from "recharts";

interface HeatmapChartProps {
  data: Array<{
    day: string;
    hour: number;
    error: number;
  }>;
  className?: string;
}

const HeatmapChart: React.FC<HeatmapChartProps> = ({ data, className }) => {
  const [selectedInterval, setSelectedInterval] = useState<'6h' | '24h' | '3d' | '7d'>('24h');
  
  // Sort days of week in correct order
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Filter data based on selected interval
  const getFilteredData = () => {
    const hoursPerDay = 24;
    let filteredData = [...data];
    
    if (selectedInterval === '6h') {
      // Just show the first 6 hours for each day
      filteredData = data.filter(item => item.hour < 6);
    } else if (selectedInterval === '24h') {
      // Show all 24 hours but only for 1 day (e.g., Monday)
      filteredData = data.filter(item => item.day === daysOfWeek[1]);
    } else if (selectedInterval === '3d') {
      // Show only first 3 days of the week
      filteredData = data.filter(item => daysOfWeek.indexOf(item.day) < 3);
    }
    // For 7d, show all data (default)
    
    return filteredData;
  };
  
  // Process data for heatmap visualization
  const processedData = getFilteredData().map(item => ({
    x: item.hour,
    y: daysOfWeek.indexOf(item.day),
    z: item.error,
    day: item.day,
    hour: item.hour,
    error: item.error
  }));

  // Get error color - using the purple to cyan color scheme
  const getErrorColor = (error: number) => {
    // Color scale from light (low error) to dark (high error)
    if (error < 0.5) return "#33C3F0"; // Low error - cyan
    if (error < 1.0) return "#66A8F0";
    if (error < 1.5) return "#9B87F5"; // Medium error - primary purple
    if (error < 2.0) return "#B87AF0";
    return "#D066F0"; // High error - magenta
  };

  // Helper function to format hour
  const formatHour = (hour: number) => {
    if (hour === 0) return "12 AM";
    if (hour === 12) return "12 PM";
    return hour < 12 ? `${hour} AM` : `${hour-12} PM`;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="neo-blur p-3 rounded-md text-sm">
          <p className="text-white font-medium text-base">{data.day}</p>
          <p className="text-gray-300">{formatHour(data.hour)}</p>
          <p className="font-medium mt-1 text-base" style={{ color: getErrorColor(data.error) }}>
            Error: {data.error.toFixed(2)}°C
          </p>
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
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />
          <XAxis 
            type="number" 
            dataKey="x" 
            name="Hour" 
            domain={[0, 23]}
            tickCount={8}
            stroke="rgba(255,255,255,0.8)"
            tick={({ x, y, payload }) => (
              <text 
                x={x} 
                y={y+12} 
                fill="rgba(255,255,255,0.9)" 
                textAnchor="middle" 
                fontSize={12}
                fontWeight="500"
              >
                {payload.value % 3 === 0 ? formatHour(payload.value) : ''}
              </text>
            )}
            label={{ 
              value: 'Hour of Day', 
              position: 'insideBottom', 
              offset: -5,
              style: { textAnchor: 'middle', fill: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 'bold' }
            }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Day"
            domain={selectedInterval === '24h' ? [1, 1] : [0, 6]}
            tickCount={selectedInterval === '24h' ? 1 : (selectedInterval === '3d' ? 3 : 7)}
            tick={(props) => {
              const { x, y, payload } = props;
              return (
                <text x={x-8} y={y} dy={4} textAnchor="end" fill="rgba(255,255,255,0.9)" fontSize={12} fontWeight="500">
                  {daysOfWeek[payload.value]}
                </text>
              );
            }}
            stroke="rgba(255,255,255,0.8)"
            width={80}
          />
          <ZAxis type="number" dataKey="z" range={[80, 600]} />
          <Tooltip content={<CustomTooltip />} />
          <Scatter data={processedData}>
            {processedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getErrorColor(entry.error)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="flex justify-center items-center mt-4">
        <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-md">
          <div className="text-sm text-white font-medium">Error Magnitude:</div>
          <div className="flex items-center gap-1">
            {[0.4, 0.9, 1.4, 1.9, 2.4].map((value, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className="w-8 h-6 rounded"
                  style={{ backgroundColor: getErrorColor(value) }}
                ></div>
                <div className="text-xs text-gray-300 mt-1">{value.toFixed(1)}°</div>
              </div>
            ))}
          </div>
          <div className="flex text-xs text-gray-400 items-center ml-2">
            <span className="ml-2">Low</span>
            <span className="mx-1">→</span>
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapChart;
