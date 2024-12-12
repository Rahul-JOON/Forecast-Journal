from dotenv import load_dotenv
import os
import requests

load_dotenv()
API_KEY = os.getenv("API_KEY")


def _12_hour_temperature_forecast(location_keys) -> None:
    """
    Fetches and prints 12-hour temperature forecast for the given locations.

    Parameters:
        location_keys (dict): A dictionary where the key is the location name
        and the value is the location key.
        e.g. {"Dwarka": "123456", "Najafgarh": "789012", ...}
    """

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
            print(f"Location: {location}")
            for hour in forecast_data:
                time = hour["DateTime"]
                temp = hour["Temperature"]["Value"]
                condition = hour["IconPhrase"]
                print(f"Time: {time}, Temp: {temp}°C, Condition: {condition}")
        else:
            print("Error fetching forecast:", forecast_response.status_code)
