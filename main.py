from dotenv import load_dotenv
import os
from key_processing import load_location_keys
from data_fetcher import _12_hour_temperature_forecast

load_dotenv()

API_KEY = os.getenv("API_KEY")

location_keys = load_location_keys()
_12_hour_temperature_forecast(location_keys)
