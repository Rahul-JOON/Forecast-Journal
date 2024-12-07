import requests
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv("API_KEY")

# Step 1: Get Dwarka's location key
LOCATION_QUERY = "Dwarka"
LOCATION_URL = "http://dataservice.accuweather.com/locations/v1/cities/search"
location_params = {"apikey": API_KEY, "q": LOCATION_QUERY}

location_response = requests.get(LOCATION_URL, params=location_params)
if location_response.status_code == 200:
    location_data = location_response.json()
    location_key = location_data[0]["Key"]  # Assuming first result is correct
    print(f"Location Key for Dwarka: {location_key}")
else:
    print("Error fetching location key:", location_response.status_code)
    exit()

# Step 2: Fetch 12-hour forecast using the location key
HOURLY_URL = f'''http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/
{location_key}'''
forecast_params = {"apikey": API_KEY, "metric": "true"}  # Metric for Celsius

forecast_response = requests.get(HOURLY_URL, params=forecast_params)
if forecast_response.status_code == 200:
    forecast_data = forecast_response.json()
    print("12-Hour Weather Forecast for Dwarka:")
    for hour in forecast_data:
        time = hour["DateTime"]
        temp = hour["Temperature"]["Value"]
        condition = hour["IconPhrase"]
        print(f"Time: {time}, Temp: {temp}°C, Condition: {condition}")
else:
    print("Error fetching forecast:", forecast_response.status_code)
