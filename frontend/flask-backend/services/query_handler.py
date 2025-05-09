from db.data_r import (
    get_value_single_where, get_value_double_where_with_between,
    get_predictions_vs_actual_with_error_by_location_id_with_date_range
    )


def get_all_temperature_data_by_city(city):
    """
    Returns the temperature data for the specified city and date range.

    Parameters:
        city (str): The city for which the data is to be fetched.
        start_date (str): The start date of the data range.
        end_date (str): The end date of the data range.
    """
    # Get the temperature data from the database
    temperature_data = get_value_single_where(
        "temperature_predictions", "*", get_value_single_where(
            "locations", "location_id", city, "location_name"
            )[0], "location_id"
    )
    return temperature_data


def get_date_range_temperature_data_by_city(city, start_date, end_date):
    """
    Returns the temperature data for the specified city and date range.

    Parameters:
        city (str): The city for which the data is to be fetched.
        start_date (str): The start date of the data range.
        end_date (str): The end date of the data range.
    """
    # Get the temperature data from the database
    temperature_data = get_value_double_where_with_between(
        "temperature_predictions", "*", get_value_single_where(
            "locations", "location_id", city, "location_name")[0],
        "location_id", start_date, end_date,
        "forecast_made_at"
        )
    return temperature_data


def chart_data_by_city_and_date_range(city, start_date, end_date):
    """
    Returns the temperature data for the specified city and date range.

    Parameters:
        city (str): The city for which the data is to be fetched.
        start_date (str): The start date of the data range.
        end_date (str): The end date of the data range.
    """
    # Get the temperature data from the database
    temperature_data = (
        get_predictions_vs_actual_with_error_by_location_id_with_date_range(
            get_value_single_where("locations", "location_id", city,
                                   "location_name")[0],
            start_date, end_date
        )
    )
    return temperature_data
