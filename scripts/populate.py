from api.data_fetcher import _12_hour_temperature_forecast
from utils.transformation import (
    _12_hour_forecast_data_db_format_transformation)
from db.data_crud import row_existence_check, insert_data
from api.key_processor import load_location_keys
from utils.logging import log_db_transaction


def populate(DB=0):

    # Start Populate transaction
    data = (("""(status, error_message)""", ("Pending", "")))
    insert_data("populate_logs", data)
    """
    If the process is completed without any errors
    the function returns True, otherwise False.

    Status and error messages are updated outside the function.
    """

    # Fetch the forecast data from the API
    # default location argument i.e bin file location keys
    json_data = _12_hour_temperature_forecast()

    # Load the location keys from the binary file
    # for syncing the location list with the database
    location_keys = load_location_keys()

    # location list syncing with the database
    for location in json_data:
        if not row_existence_check("locations", "location_name", location):
            print(f"{location} does not exist in the database.")
            print("Adding the location into the database...")
            # If the location does not exist in the "location" table,
            # add the location to the database
            data = (("(location_name, unique_key)"),
                    (location, location_keys[location]))
            if insert_data("locations", data):
                # Log Status
                status = "Success"
                error_message = ""
                print("Data inserted successfully.")
            else:
                # Log Status and error message
                status = "Failed"
                error_message = "Error inserting data."
                print("Error inserting data.")

            # Log the transaction
            log_db_transaction("insert", "locations", status, error_message)

    # Transform the forecast data into a db-friendly format
    db_format_data = _12_hour_forecast_data_db_format_transformation(json_data)

    # Dump the forecast data into the "temperature_predictions" table
    for location in db_format_data:
        # Feedback print
        print(f"Inserting data for {location}...")

        # Query tuple for inserting data into the database
        # The first element is the column names
        data = (("""(location_id, forecast_for_hour, forecast_made_at,
                 temperature)"""),)
        # Append the data to the query tuple
        for i in db_format_data[location]:
            data += (i[0:4],)  # 0:4 are the required elements

        # Insert the data into the database
        if insert_data("temperature_predictions", data):
            # Log Status
            status = "Success"
            error_message = ""
            print("Data inserted successfully.")
        else:
            status = "Failed"
            error_message = "Error inserting data."
            print("Error inserting data.")

        # Log the transaction
        log_db_transaction("insert", "temperature_predictions", status,
                           error_message)

    return True
