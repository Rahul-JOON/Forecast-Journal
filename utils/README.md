# Utils Folder

The `utils` folder contains utility modules that support logging and data transformation tasks for the Forecast Journal project. These modules ensure smooth operations by handling logging and converting API data into a format compatible with the database schema.

---

## Files and Descriptions

### 1. `logging.py`

#### Purpose:
Manages logging of API and database transactions by recording them into dedicated tables within the database.

#### Functionality:
- Logs API transactions:
  - Records API endpoint, request payload, response status, and timestamps.
- Logs database transactions:
  - Captures query details, affected tables, execution times, and any errors encountered.
- Provides functions for structured and consistent logging.
---

### 2. `transformation.py`

#### Purpose:
Cleans and transforms JSON data fetched from the [AccuWeather API](https://developer.accuweather.com/) into a format compatible with the local database schema.

#### Functionality:
- Removes unnecessary fields from the raw API data.
- Renames fields to match database column names.
- Formats data types (e.g., converting timestamps to `datetime` objects, handling null values).
- Validates the transformed data against the local schema to ensure consistency.
---

## Notes
- These utilities are foundational for maintaining data integrity and debugging capabilities.
- The logging module aids in tracking issues and ensuring transparency in API and database operations.
- The transformation module ensures the seamless integration of external data into the database.