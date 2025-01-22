from dotenv import load_dotenv
import os
import requests
from api.key_processor import load_location_keys
from utils.logging import log_api_interaction

# Load the API key from the .env file
load_dotenv()
API_KEY = os.getenv("API_KEY")


def _12_hour_temperature_forecast(location_keys=load_location_keys()) -> dict:
    """
    Fetches the 12-hour temperature forecast for the given locations.
    Returns the forecast data in JSON format.

    Can be given a new set of location keys as a parameter; otherwise, it
    uses the default location keys from location_keys.bin.

    Return e.g {"Delhi": [{"DateTime": "2025-01-21T15:00:00+05:30",
    "EpochDateTime": 1737451800, "WeatherIcon": 1, "IconPhrase": "Sunny",
    "HasPrecipitation": false, "IsDaylight": true,
    "Temperature": {"Value": 23.8, "Unit": "C", "UnitType": 17},
    "PrecipitationProbability": 0,
    "MobileLink": "http://www.accuweather.com/en/in/bahadurgarh/188460/hourly
    -weather-forecast/188460?day=1&hbhhour=15&unit=c&lang=en-us",
    "Link": "http://www.accuweather.com/en/in/bahadurgarh/188460/hourly
    -weather-forecast/188460?day=1&hbhhour=15&unit=c&lang=en-us"}]
    }

    Parameters:
        location_keys (dict): A dictionary where the key is the location name
        and the value is the location key.
        e.g. {"Dwarka": "123456", "Najafgarh": "789012", ...}
    """
    # Final JSON response
    json_response = {}

    # Log Error Message
    error_message = ""
    for location in location_keys:
        location_key = location_keys[location]
        HOURLY_URL = (
            f'''http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/
            {location_key}'''
            )
        forecast_params = {
            "apikey": API_KEY,
            "metric": "true"
        }  # Metric for Celsius

        forecast_response = requests.get(HOURLY_URL, params=forecast_params)
        if forecast_response.status_code == 200:
            forecast_data = forecast_response.json()
            json_response[location] = forecast_data
        else:
            error_message = (
                f"Error fetching forecast: {forecast_response.status_code}"
                )
            print("Error fetching forecast:", forecast_response.status_code)

        # Log the API interaction details
        log_api_interaction(HOURLY_URL, "GET",
                            forecast_response.status_code, error_message)
    return json_response
