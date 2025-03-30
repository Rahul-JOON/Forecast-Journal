
// Utility functions to generate mock data for charts

// Generate time series data for temperature forecast
export const generateTimeSeriesData = (days = 7) => {
  const result = [];
  const now = new Date();
  
  for (let i = 0; i < days * 24; i++) {
    const date = new Date(now.getTime() + i * 60 * 60 * 1000);
    
    // Generate actual and predicted values with some variance
    const actual = 15 + 10 * Math.sin(i / 24 * Math.PI / 3.5) + (Math.random() * 3 - 1.5);
    const predicted = actual + (Math.random() * 6 - 3); // Prediction with error
    
    result.push({
      time: date.toISOString(),
      hour: date.getHours(),
      actual: parseFloat(actual.toFixed(1)),
      predicted: parseFloat(predicted.toFixed(1)),
      error: parseFloat((predicted - actual).toFixed(1))
    });
  }
  
  return result;
};

// Generate error distribution data
export const generateErrorDistributionData = () => {
  // Generate errors with a slight bias
  const errors = Array.from({ length: 1000 }, () => (Math.random() * 10 - 5));
  
  // Count frequency of errors in bins
  const bins: Record<string, number> = {};
  for (let i = -5; i <= 5; i += 0.5) {
    bins[i.toFixed(1)] = 0;
  }
  
  errors.forEach(error => {
    const binKey = (Math.floor(error * 2) / 2).toFixed(1);
    if (bins[binKey] !== undefined) {
      bins[binKey]++;
    }
  });
  
  // Convert to array format for charts
  return Object.entries(bins).map(([error, count]) => ({
    error: parseFloat(error),
    count: count as number
  }));
};

// Generate heatmap data for error magnitude across hours and days
export const generateHeatmapData = () => {
  const result = [];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      // Some patterns in the data - mornings and evenings have higher errors
      let errorBias = 0;
      if (hour < 6) errorBias = 0.5;  // Early morning higher error
      else if (hour > 18) errorBias = 0.7; // Evening higher error
      else if (hour > 10 && hour < 14) errorBias = -0.3; // Mid-day better accuracy
      
      // Weekends have slightly different patterns
      if (day === 0 || day === 6) errorBias += 0.2;
      
      const error = Math.abs(errorBias + (Math.random() * 2.5));
      
      result.push({
        day: daysOfWeek[day],
        hour,
        error: parseFloat(error.toFixed(2))
      });
    }
  }
  
  return result;
};

export const cities = [
  "Najafgarh",
  "Dwarka",
  "Bahadurgarh",
  "Hauz Khas",
];
