# API

The `API` folder contains modules responsible for interacting with external APIs, processing data, and managing location-specific configurations. Below is a detailed overview of the files and their respective functions:

---

## Files and Functions

### 1. `data_fetcher.py`

This module handles the retrieval of 12-hour temperature forecasts for specified locations using the [AccuWeather API](https://developer.accuweather.com/).

#### Functions

- **`_12_hour_temperature_forecast`**

---

### 2. `key_processor.py`

This module manages the storage and retrieval of location keys, which are essential for interacting with the AccuWeather API.

#### Functions

- **`get_location_keys`**


- **`store_location_keys`**


- **`load_location_keys`**


---

## Usage
1. Place your API keys and configuration in the appropriate environment or configuration files.
2. Use `data_fetcher.py` to fetch temperature forecasts for specific locations.
3. Use `key_processor.py` to manage and retrieve location keys efficiently.

---

## Notes
- Ensure that your AccuWeather API key is active and has the necessary permissions.
- Stored location keys should be updated periodically to reflect changes or additions.