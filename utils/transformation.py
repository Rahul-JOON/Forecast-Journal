import datetime


def _12_hour_forecast_data_db_format_transformation(json_data: dict) -> dict:
    """
    Transforms the 12-hour forecast data into a database-friendly format.

    Returns a clean dictionary where the key is the location name and the
    value is a list of tuples containing the current time, the forecast time,
    and the temperature.

    e.g. {'Dwarka': [('2025-01-21T15:24:14.915621',
            '2025-01-21T16:00:00+05:30', 24.4)}

    P.S refer to unclean data in api/data_fetcher.py
    """

    nice_format_data = {}
    for location in json_data:
        currtime = datetime.datetime.now().isoformat()
        forecast_data = json_data[location]
        nice_format_data[location] = []
        for hour in forecast_data:
            time = hour["DateTime"]
            temp = hour["Temperature"]["Value"]
            nice_format_data[location].append((currtime, time, temp))
    return nice_format_data
