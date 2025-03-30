import json
from datetime import datetime


def convert_db_data_to_frontend_json(forecast_tuples):
    """
    Convert a list of forecast data tuples to a JSON-serializable format.

    Args:
        forecast_tuples: List of tuples containing forecast data with fields:
            (location_id, forecast_for_hour, actual_reading_id,
            prediction_id, forecast_made_at, hours_in_advance,
            predicted_temperature, actual_temperature, prediction_error,
            absolute_error)

    Returns:
        JSON string representation of the data
    """
    # Define column names for the tuple data
    column_names = [
        "location_id", "forecast_for_hour",
        "actual_reading_id", "prediction_id", "forecast_made_at",
        "hours_in_advance", "predicted_temperature", "actual_temperature",
        "prediction_error", "absolute_error"
    ]

    # Convert tuples to dictionaries
    forecast_dicts = []
    for tup in forecast_tuples:
        forecast_dict = dict(zip(column_names, tup))

        # Ensure datetime strings are properly formatted
        # If they're already strings, this will pass through
        # If they're datetime objects, this will convert them to ISO format
        for dt_field in ["forecast_for_hour", "forecast_made_at"]:
            if isinstance(forecast_dict[dt_field], datetime):
                forecast_dict[dt_field] = forecast_dict[dt_field].isoformat()

        forecast_dicts.append(forecast_dict)

    return forecast_dicts


# Example usage
if __name__ == "__main__":
    # Sample data (your actual tuples would go here)
    sample_data = [
        (1, "2025-02-26 00:00:00", 16945, 16853,
         "2025-02-25 14:10:10.741948",
         9.8303494588888889, 17.1, 17.1, 0, 0),
        (1, "2025-02-26 02:00:00", 16993, 16901,
         "2025-02-25 16:13:04.480218",
         9.7820888283333333, 15.9, 16.9, -0.9999999999999982,
         0.9999999999999982)
    ]

    # Convert to JSON-serializable format
    json_data = convert_db_data_to_frontend_json(sample_data)

    # Print or save the JSON
    print(json.dumps(json_data, indent=2))

    # Optionally save to a file
    # with open("forecast_data.json", "w") as f:
    #     json.dump(json_data, f, indent=2)
