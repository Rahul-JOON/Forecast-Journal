from key_processing import load_location_keys

"""
# Ececute only when need to update
from key_processing import store_location_keys, get_location_keys

# List of locations to get keys for"
locations = ["Dwarka", "Najafgarh", "Nawada", "Bahadurgarh"]

location_keys = get_location_keys(locations)

store_location_keys(location_keys)
"""

# Load the location keys from the binary file and print them
loaded_keys = load_location_keys()
print(loaded_keys)
