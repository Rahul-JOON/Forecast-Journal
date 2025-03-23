import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ChartCard from "@/components/ui/ChartCard";
import TimeSeriesChart from "@/components/charts/TimeSeriesChart";
import ErrorDistributionChart from "@/components/charts/ErrorDistributionChart";
import HeatmapChart from "@/components/charts/HeatmapChart";
import CitySelector from "@/components/selectors/CitySelector";
import DateRangeSelector from "@/components/selectors/DateRangeSelector";
import LoadDataButton from "@/components/selectors/LoadDataButton";
import { 
  generateTimeSeriesData, 
  generateErrorDistributionData,
  generateHeatmapData,
  cities
} from "@/utils/mockData";
import { 
  fetchInitialForecastData,
  fetchFilteredForecastData,
  downloadForecastData,
  convertToTimeSeriesFormat,
  convertToErrorDistributionFormat,
  convertToHeatmapFormat,
  ForecastRequestParams
} from "@/services/api";
import { ArrowDown, ArrowRight, BarChart3, Clock, LineChart, Github, Linkedin, Download } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  // Toast for notifications
  const { toast } = useToast();
  
  // State for data and filters
  const [timeSeriesData, setTimeSeriesData] = useState(generateTimeSeriesData(7));
  const [errorDistData, setErrorDistData] = useState(generateErrorDistributionData());
  const [heatmapData, setHeatmapData] = useState(generateHeatmapData());
  const [selectedCity, setSelectedCity] = useState("Najafgarh");
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
  });
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch initial data from API
  const fetchInitialData = async () => {
    setIsLoading(true);
    
    try {
      const forecastData = await fetchInitialForecastData();
      
      if (forecastData && forecastData.length > 0) {
        // Convert data to chart formats
        setTimeSeriesData(convertToTimeSeriesFormat(forecastData));
        setErrorDistData(convertToErrorDistributionFormat(forecastData));
        setHeatmapData(convertToHeatmapFormat(forecastData));
        
        toast({
          title: "Data Loaded",
          description: `Loaded ${forecastData.length} records from the server.`,
        });
      } else {
        // Fallback to mock data if API returns no data
        setTimeSeriesData(generateTimeSeriesData(7));
        setErrorDistData(generateErrorDistributionData());
        setHeatmapData(generateHeatmapData());
        
        toast({
          title: "Using Mock Data",
          description: "No data available from server. Using generated data.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
      
      // Fallback to mock data on error
      setTimeSeriesData(generateTimeSeriesData(7));
      setErrorDistData(generateErrorDistributionData());
      setHeatmapData(generateHeatmapData());
      
      toast({
        title: "Data Fetch Error",
        description: "Failed to fetch forecast data. Using mock data instead.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to load data with filters
  const loadFilteredData = async () => {
    setIsLoading(true);
    
    const params: ForecastRequestParams = {
      city: selectedCity,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
    
    try {
      const forecastData = await fetchFilteredForecastData(params);
      
      if (forecastData && forecastData.length > 0) {
        // Convert data to chart formats
        setTimeSeriesData(convertToTimeSeriesFormat(forecastData));
        setErrorDistData(convertToErrorDistributionFormat(forecastData));
        setHeatmapData(convertToHeatmapFormat(forecastData));
        
        toast({
          title: "Data Loaded",
          description: `Loaded ${forecastData.length} records for ${selectedCity} from ${format(startDate, "MMM d, yyyy")} to ${format(endDate, "MMM d, yyyy")}.`,
        });
      } else {
        toast({
          title: "No Data Available",
          description: "No data available for the selected filters. Try a different selection.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error);
      
      toast({
        title: "Data Fetch Error",
        description: "Failed to fetch filtered forecast data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle download button click
  const handleDownload = async () => {
    const params: ForecastRequestParams = {
      city: selectedCity,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
    
    await downloadForecastData(params);
  };

  // Handle date range change
  const handleDateRangeChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  // Handle city change
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };
  
  // Fetch data on initial load
  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar selectedCity={selectedCity} />
      
      {/* Hero Section */}
      <section className="h-screen pt-24 md:pt-32 relative flex items-center">
        <Container>
          <div className="flex flex-col-reverse md:flex-row items-center">
            <div className="w-full md:w-1/2 text-left md:pr-10">
              <h1 className="text-5xl md:text-6xl font-medium mb-4 animate-fade-in">
                <span className="bg-gradient-to-r from-primary-purple to-primary-blue bg-clip-text text-transparent">Forecast Journal</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl mb-8 animate-fade-in">
                Visualize, analyze, and understand weather forecast accuracy
                with interactive charts and comprehensive data analysis.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in">
                <a
                  href="#trends"
                  className="px-6 py-3 bg-gradient-to-r from-primary-purple to-primary-blue rounded-lg font-medium hover:opacity-90 transition-opacity inline-flex items-center"
                >
                  Explore Trends <ArrowRight size={18} className="ml-1" />
                </a>
                <a
                  href="#theory"
                  className="px-6 py-3 bg-white/5 text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 mb-10 md:mb-0 animate-fade-in">
              <div className="glass-morphism rounded-xl overflow-hidden p-2">
                <TimeSeriesChart data={timeSeriesData.slice(0, 24)} />
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float text-center hidden sm:flex sm:flex-col">
            <a href="#theory" className="flex flex-col items-center text-gray-400 hover:text-white transition-colors">
              <span className="text-sm mb-2">Scroll to explore</span>
              <ArrowDown size={20} />
            </a>
          </div>
        </Container>
      </section>
      
      {/* Theory Section */}
      <Section
        id="theory"
        title="Understanding Forecast Analysis"
        subtitle="Explore the methodology and importance of analyzing weather forecast accuracy"
        fullHeight={true}
        className="flex items-center"
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-morphism p-6 rounded-xl animate-fade-in-up">
              <div className="w-12 h-12 rounded-full bg-primary-purple/20 flex items-center justify-center mb-4">
                <span className="text-primary-purple font-bold text-xl">01</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">What We Track</h3>
              <p className="text-gray-400">
                We compare predicted temperatures with actual recorded values across
                different cities and time periods to evaluate forecast precision.
              </p>
            </div>
            
            <div className="glass-morphism p-6 rounded-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 rounded-full bg-primary-blue/20 flex items-center justify-center mb-4">
                <span className="text-primary-blue font-bold text-xl">02</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Why It Matters</h3>
              <p className="text-gray-400">
                Understanding forecast accuracy helps improve prediction models,
                leading to better preparation for weather events and resource planning.
              </p>
            </div>
            
            <div className="glass-morphism p-6 rounded-xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-12 h-12 rounded-full bg-neon-mint/20 flex items-center justify-center mb-4">
                <span className="text-neon-mint font-bold text-xl">03</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">How We Analyze</h3>
              <p className="text-gray-400">
                Using statistical methods and visualizations, we highlight patterns,
                biases, and anomalies in forecast data across different time periods.
              </p>
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Trends Section */}
      <Section
        id="trends"
        title="Forecast Trends & Analysis"
        subtitle="Visualize temperature forecast accuracy across cities and time periods"
        fullHeight={true}
        className="flex items-center"
      >
        <Container>
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-xl font-semibold">Data Filters</h3>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <CitySelector
                cities={cities}
                selectedCity={selectedCity}
                onSelect={handleCityChange}
                className="w-full sm:w-48"
              />
              <DateRangeSelector
                startDate={startDate}
                endDate={endDate}
                onDateRangeChange={handleDateRangeChange}
                className="w-full sm:w-auto"
              />
              <LoadDataButton
                onClick={loadFilteredData}
                isLoading={isLoading}
                className="mt-2 sm:mt-0 w-full sm:w-auto"
              />
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-white text-lg">Loading data...</div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-6 mb-8">
                <ChartCard
                  title="Temperature Forecast vs Actual"
                  description="This chart compares the predicted temperature with the actual recorded temperature over time. The difference between these lines represents the forecast error."
                  className="animate-fade-in-up"
                >
                  <TimeSeriesChart data={timeSeriesData} />
                </ChartCard>
                
                <ChartCard
                  title="Error Distribution"
                  description="This histogram shows the distribution of forecast errors. A concentration near zero indicates better overall accuracy."
                  className="animate-fade-in-up"
                  style={{ animationDelay: '0.2s' }}
                >
                  <ErrorDistributionChart data={errorDistData} />
                </ChartCard>
              </div>
              
              <ChartCard
                title="Error Heatmap by Day &amp; Hour"
                description="This heatmap visualizes forecast error patterns across different days of the week and hours of the day, helping identify when forecasts tend to be most and least accurate."
                fullWidth
                className="animate-fade-in-up mb-8 overflow-x-auto"
                style={{ animationDelay: '0.4s' }}
              >
                <div className="min-w-[768px]">
                  <HeatmapChart data={heatmapData} />
                </div>
              </ChartCard>
            </>
          )}
          
          <div className="glass-morphism p-6 rounded-xl animate-fade-in-up mt-8" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <BarChart3 size={20} className="mr-2 text-primary-purple" />
              Key Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary-purple mt-2 mr-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <span className="font-medium">Oscillating Accuracy:</span>{" "}
                    The "Temperature Forecast vs Actual" chart shows a consistent, cyclical pattern where the predicted temperature closely follows the actual temperature, but with noticeable deviations, indicating varying forecast accuracy over time.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary-purple mt-2 mr-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <span className="font-medium">Skewed Error Distribution:</span>{" "}
                    The "Error Distribution" histogram reveals a right-skewed distribution, suggesting a tendency for the model to underpredict temperatures, with a significant number of errors falling on the positive side (actual higher than predicted).
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary-purple mt-2 mr-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <span className="font-medium">Hourly Error Variation:</span>{" "}
                    The "Error Heatmap" highlights that forecast errors are not uniform across the day, with certain hours (particularly around midday) exhibiting larger errors, implying potential time-dependent factors influencing prediction accuracy.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary-purple mt-2 mr-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <span className="font-medium">Limited Daily Pattern Insight:</span>{" "}
                    The "Error Heatmap" shows data for only three days (Monday, Wednesday, Saturday), making it difficult to draw definitive conclusions about weekly error patterns. A longer observation period would be needed to assess daily trends comprehensively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      {/* About Section */}
      <Section
        id="about"
        title="About Me"
        subtitle="The story and methodology behind Forecast Journal"
        className="py-16 md:py-24 min-h-screen flex flex-col justify-center"
      >
        <Container>
          <div className="glass-morphism rounded-xl overflow-hidden animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-semibold mb-4">My Mission</h3>
                <p className="text-gray-300 mb-6">
                  Forecast Journal was created to bring transparency to weather 
                  prediction accuracy. By analyzing forecast data across different 
                  regions and time periods, I aim to help meteorologists, researchers, 
                  and weather enthusiasts better understand prediction patterns and improve 
                  forecasting models.
                </p>
                <h3 className="text-2xl font-semibold mb-4">Methodology</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start">
                    <Clock size={20} className="text-primary-purple mt-1 mr-3 flex-shrink-0" />
                    <p>
                      I collect hourly temperature forecasts and compare them with actual 
                      recorded temperatures from weather stations.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <LineChart size={20} className="text-primary-purple mt-1 mr-3 flex-shrink-0" />
                    <p>
                      Using statistical analysis and data visualization techniques, I 
                      identify patterns, biases, and anomalies in the forecast data.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
                  <div className="flex items-center space-x-4">
                    <a 
                      href="https://github.com/Rahul-JOON" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-300 hover:text-primary-purple transition-colors"
                    >
                      <Github size={20} />
                      <span>GitHub</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/rahul-joon/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-300 hover:text-primary-purple transition-colors"
                    >
                      <Linkedin size={20} />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-purple/20 to-primary-blue/20 p-8 md:p-10">
                <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-primary-purple/50">
                  <img 
                    src="/credits.JPG"
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-2xl font-semibold mb-6 text-center">Download Resources</h3>
                <p className="text-gray-300 mb-6">
                  Forecast Journal is an independent research initiative. Your support 
                  helps me maintain and expand data collection and analysis capabilities.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={handleDownload}
                    className="block w-full py-3 text-center bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <Download size={18} className="mr-2" />
                    Download Data
                  </button>
                  <a
                    href="mailto:rahul.2616412821@ipu.ac.in"
                    className="block w-full py-3 text-center bg-gradient-to-r from-primary-purple to-primary-blue hover:opacity-90 text-white border border-primary-purple/30 rounded-lg font-medium transition-colors"
                  >
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Footer */}
      <footer className="py-8 border-t border-white/10 bg-[#121212]">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-xl font-medium text-white flex items-center">
                <span className="bg-gradient-to-r from-primary-purple to-primary-blue bg-clip-text text-transparent">🌤️ Forecast Journal</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">
                Weather forecast analysis and visualization
              </p>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Forecast Journal. All rights reserved.
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Index;
