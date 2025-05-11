from db.data_r import (
    get_value_single_where, get_value_double_where_with_between,
    get_predictions_vs_actual_with_error_by_location_id_with_date_range
    )

def location_validation(location_id):
    #TODO
    pass

def get_all_temperature_data_by_city(city):
    """
    Returns the temperature data for the specified city and date range.

    Parameters:
        city (str): The city for which the data is to be fetched.
        start_date (str): The start date of the data range.
        end_date (str): The end date of the data range.
    """
    # Get location ID for the city
    location_result = get_value_single_where(
        "locations", "location_id", city, "location_name")
    
    # Check if location lookup failed
    if location_result is False or not location_result:
        print(f"Failed to get location_id for city: {city}")
        print("Trying again...")
        location_result = get_value_single_where(
            "locations", "location_id", city, "location_name")
        if location_result is False or not location_result:
            print(f"Failed to get location_id for city: {city} again")
            return []
        print("Success!")
        
    location_id = location_result[0]
    
    # Get the temperature data from the database
    temperature_data = get_value_single_where(
        "temperature_predictions", "*", location_id, "location_id"
    )
    return temperature_data if temperature_data else []


def get_date_range_temperature_data_by_city(city, start_date, end_date):
    """
    Returns the temperature data for the specified city and date range.

    Parameters:
        city (str): The city for which the data is to be fetched.
        start_date (str): The start date of the data range.
        end_date (str): The end date of the data range.
    """
    # Get location ID for the city
    location_result = get_value_single_where(
        "locations", "location_id", city, "location_name")
    
    # Check if location lookup failed
    if location_result is False or not location_result:
        print(f"Failed to get location_id for city: {city}")
        print("Trying again...")
        location_result = get_value_single_where(
            "locations", "location_id", city, "location_name")
        if location_result is False or not location_result:
            print(f"Failed to get location_id for city: {city} again")
            return []
        print("Success!")
        
    location_id = location_result[0]
    
    # Get the temperature data from the database
    temperature_data = get_value_double_where_with_between(
        "temperature_predictions", "*", location_id,
        "location_id", start_date, end_date,
        "forecast_made_at"
        )
    return temperature_data if temperature_data else []


def chart_data_by_city_and_date_range(city, start_date, end_date):
    """
    Returns the temperature data for the specified city and date range.

    Parameters:
        city (str): The city for which the data is to be fetched.
        start_date (str): The start date of the data range.
        end_date (str): The end date of the data range.
    """
    # Get location ID for the city
    location_result = get_value_single_where(
        "locations", "location_id", city, "location_name")
    
    # Check if location lookup failed
    if location_result is False or not location_result:
        print(f"Failed to get location_id for city: {city}")
        print("Trying again...")
        location_result = get_value_single_where(
            "locations", "location_id", city, "location_name")
        if location_result is False or not location_result:
            print(f"Failed to get location_id for city: {city} again")
            return []
        print("Success!")
        
    location_id = location_result[0]
    
    # Get the temperature data from the database
    temperature_data = (
        get_predictions_vs_actual_with_error_by_location_id_with_date_range(
            location_id,  # Use the location_id variable instead of another lookup
            start_date, end_date
        )
    )
    return temperature_data if temperature_data else []
