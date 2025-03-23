
import { toast } from "@/components/ui/use-toast";

// Base URL for the Flask API
const API_BASE_URL = process.env.API_BASE_URL;

// Error handling helper
const handleApiError = (error: any, message: string) => {
  console.error(`API Error: ${message}`, error);
  toast({
    title: "Error",
    description: message,
    variant: "destructive",
  });
  return null;
};

// Interface for the forecast data request parameters
export interface ForecastRequestParams {
  city: string;
  startDate: string; // ISO format date string
  endDate: string; // ISO format date string
}

// Interface for parsed forecast data
export interface ForecastData {
  location_id: number;
  forecast_for_hour: Date;
  actual_reading_id: number;
  prediction_id: number;
  forecast_made_at: Date;
  hours_in_advance: number;
  predicted_temperature: number;
  actual_temperature: number;
  prediction_error: number;
  absolute_error: number;
}

/**
 * Converts JSON formatted forecast data to ForecastData objects with proper Date instances
 */
const parseJsonForecastData = (jsonData: string | any): ForecastData[] => {
  try {
    // Parse JSON if it's a string
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    
    // Map each JSON object to a ForecastData object
    return data.map((item: any) => ({
      location_id: parseInt(item.location_id),
      // Convert ISO string dates to JavaScript Date objects
      // Note the property name change from forecastforHour to forecastHour
      forecast_for_hour: new Date(item.forecast_for_hour),
      actual_reading_id: parseInt(item.actual_reading_id),
      prediction_id: parseInt(item.prediction_id),
      forecast_made_at: new Date(item.forecast_made_at),
      hours_in_advance: parseInt(item.hours_in_advance),
      predicted_temperature: parseFloat(item.predicted_temperature),
      actual_temperature: parseFloat(item.actual_temperature),
      prediction_error: parseFloat(item.prediction_error),
      absolute_error: parseFloat(item.absolute_error)
    }));
  } catch (error) {
    console.error("Error parsing JSON forecast data:", error);
    return [];
  }
};

// Convert forecast data to time series format
export const convertToTimeSeriesFormat = (data: ForecastData[]): Array<{
  time: string;
  hour: number;
  actual: number;
  predicted: number;
  error: number;
}> => {
  return data.map(item => {
    // const actual = item.temperature + (Math.random() * 4 - 2); // Random variation ±2°
    // const error = item.temperature - actual;
    
    return {
      time: item.forecast_for_hour.toISOString(),
      hour: item.forecast_for_hour.getHours(),
      actual: item.actual_temperature,
      predicted: item.predicted_temperature,
      error: item.absolute_error
    };
  });
};

// Convert forecast data to error distribution format
export const convertToErrorDistributionFormat = (data: ForecastData[]): Array<{
  error: number;
  count: number;
}> => {
  // Create error buckets
  const errorMap = new Map<number, number>();
  
  data.forEach(item => {
    const actual = item.actual_temperature
    const error = item.absolute_error
    
    // Count occurrences of each error value
    errorMap.set(error, (errorMap.get(error) || 0) + 1);
  });
  
  // Convert map to array
  return Array.from(errorMap.entries()).map(([error, count]) => ({
    error,
    count
  }));
};

// Convert forecast data to heatmap format
export const convertToHeatmapFormat = (data: ForecastData[]): Array<{
  day: string;
  hour: number;
  error: number;
}> => {
  const result = [];
  
  data.forEach(item => {
    const actual = item.actual_temperature
    const error = item.absolute_error
    const day = item.forecast_for_hour.toLocaleDateString('en-US', { weekday: 'short' });
    const hour = item.forecast_for_hour.getHours();
    
    result.push({
      day,
      hour,
      error
    });
  });
  
  return result;
};

// Fetch initial forecast data from the API
export const fetchInitialForecastData = async (): Promise<ForecastData[] | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/home`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const jsondata = await response.json();
    // console.log("json data", jsondata);
    // console.log("parsed data", parseJsonForecastData(jsondata));
    return parseJsonForecastData(jsondata);
  } catch (error) {
    return handleApiError(error, "Failed to fetch initial forecast data. Using mock data instead.");
  }
};

// Send selected filters to backend and get filtered forecast data
export const fetchFilteredForecastData = async (params: ForecastRequestParams): Promise<ForecastData[] | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/home`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        city: params.city,
        start_date: params.startDate,
        end_date: params.endDate
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return parseJsonForecastData(data);
  } catch (error) {
    return handleApiError(error, "Failed to fetch filtered forecast data. Using mock data instead.");
  }
};

// Download data as CSV
export const downloadForecastData = async (params: ForecastRequestParams): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/download`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        city: params.city,
        start_Date: params.startDate,
        end_Date: params.endDate
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Get the blob from the response
    const blob = await response.blob();
    
    // Create a temporary URL for the blob
    const url = window.URL.createObjectURL(blob);
    
    // Create a link and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `forecast_data_${params.city}_${params.startDate}_${params.endDate}.csv`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast({
      title: "Success",
      description: "Data downloaded successfully",
    });
  } catch (error) {
    handleApiError(error, "Failed to download forecast data.");
  }
};
