from api.data_fetcher import _12_hour_temperature_forecast
from utils.transformation import (
    _12_hour_forecast_data_db_format_transformation)
# from db.data_crud import insert_data


def populate():

    # Fetch the forecast data from the API
    # default location argument i.e bin file location keys
    json_data = _12_hour_temperature_forecast()
    print(json_data)

    # Transform the forecast data into a db-friendly format
    db_format_data = _12_hour_forecast_data_db_format_transformation(json_data)
    print(db_format_data)

    # To Do: Insert the data into the database - locations and temp predictions
