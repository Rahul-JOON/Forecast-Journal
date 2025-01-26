import datetime
from api.key_processor import load_location_keys
from db.data_crud import get_value_single_where


def _12_hour_forecast_data_db_format_transformation(json_data: dict) -> dict:
    """
    Transforms the 12-hour forecast data into a database-friendly format.

    Returns a clean dictionary where the key is the location name and the
    value is a list of tuples containing the location id, current time,
    the forecast time, and the temperature and lastly the key.

    e.g. {'Dwarka': [('1', '2025-01-21T15:24:14.915621',
            '2025-01-21T16:00:00+05:30', 24.4, '18527')]}

    P.S refer to unclean data in api/data_fetcher.py
    """

    nice_format_data = {}
    location_keys = load_location_keys()
    for location in json_data:
        location_id = get_value_single_where("locations", "location_id",
                                             location, "location_name")
        currtime = datetime.datetime.now().isoformat()
        forecast_data = json_data[location]
        nice_format_data[location] = []
        for hour in forecast_data:
            time = hour["DateTime"]
            temp = hour["Temperature"]["Value"]
            key = location_keys[location]
            nice_format_data[location].append((location_id, currtime, time,
                                               temp, key))
    return nice_format_data
