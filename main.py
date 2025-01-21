from api.key_processor import load_location_keys
from api.data_fetcher import _12_hour_temperature_forecast

# Ececute only when need to update the keys
"""
from scripts.key_updater import update_keys

# List of locations to get keys for"
locations = ["Dwarka", "Najafgarh", "Nawada", "Bahadurgarh"]

update_keys(locations)
"""

location_keys = load_location_keys()
_12_hour_temperature_forecast(location_keys)
