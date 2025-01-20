import pickle
from dotenv import load_dotenv
import os
import requests

# Load the API key from the .env file
load_dotenv()
API_KEY = os.getenv("API_KEY")


def get_location_keys(locations) -> dict:
    """
    Fetches and logs locations's keys into a dict file.

    Parameters:
        locations (list): A list of location names to get keys for.
        e.g. ["Dwarka", "Najafgarh", "Nawada", "Bahadurgarh"]

    Returns:
        dict: A dictionary where the key is the location name and the value is
        the location key.
        e.g. {"Dwarka": "123456", "Najafgarh": "789012", ...}
    """
    location_keys = {}
    LOCATION_URL = (
        "http://dataservice.accuweather.com/locations/v1/cities/search"
        )
    for LOCATION in locations:
        location_params = {"apikey": API_KEY, "q": LOCATION}

        # Make a request to the API to get location data
        location_response = requests.get(LOCATION_URL, params=location_params)
        if location_response.status_code == 200:
            location_data = location_response.json()
            location_key = location_data[0]["Key"]
            # storing location data in a dictionary
            location_keys[LOCATION] = location_key
        else:
            print("Error fetching location key:",
                  location_response.status_code)
            exit()
    return location_keys


def store_location_keys(location_keys, filename="location_keys.bin") -> None:
    """
    Stores location keys in a binary file.

    Parameters:
        location_keys (dict): A dictionary where the key is the location name
        and the value is the location key.
        e.g. {"Dwarka": "123456", "Najafgarh": "789012", ...}
        filename (str): Name of the binary file to save the keys.
        e.g. "location_keys.bin"
    """
    try:
        with open(filename, "wb") as file:
            pickle.dump(location_keys, file)
        print(f"Location keys saved to {filename}.")
    except Exception as e:
        print(f"Error saving location keys: {e}")


def load_location_keys(filename="location_keys.bin") -> dict:
    """
    Fuction loads location keys from a binary file.

    Parameters:
        filename (str): Name of the binary file to load the keys from.
        e.g. "location_keys.bin"

    Returns:
        dict: A dictionary where the key is the location name and the value is
        the location key.
        e.g. {"Dwarka": "123456", "Najafgarh": "789012", ...}
    """
    try:
        with open(filename, "rb") as file:
            return pickle.load(file)
    except Exception as e:
        print(f"Error loading location keys: {e}")
        return {}
