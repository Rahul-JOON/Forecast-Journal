# Scripts Folder

The `scripts` folder contains scripts designed to facilitate data fetch and database operations. These scripts are intended to automate tasks such as updating location keys or populating the database with latest data.

---

## Files and Descriptions

### 1. `key_updater.py`

#### Purpose:
Updates location keys stored in the database by interacting with the [AccuWeather API](https://developer.accuweather.com/).

#### Functionality:
- Fetches updated location keys for specified locations.
- Ensures the database reflects the most current and accurate location-key mappings.
---

### 2. `populate.py`

#### Purpose:
Populates the database with latest data, including forecasted temperatures and location details.

#### Functionality:
- Inserts multiple rows of data into the database in a single execution.
- Utilizes the database connection pool for efficient bulk operations.
- Verifies data consistency to prevent redundant or conflicting entries.
---

## Notes
- Ensure all dependencies and configurations are correctly set before executing these scripts.
- Both scripts rely on the database connection pool and modules from the `db` folder.
- Use these scripts responsibly, especially when working with production databases.