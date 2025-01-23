from scripts.populate import populate
from db.data_crud import update_row_single_where, last_insert_id

# Ececute only when need to update the keys
"""
from scripts.key_updater import update_keys

# List of locations to get keys for"
locations = ["Dwarka", "Najafgarh", "Hauz Khas", "Bahadurgarh"]

update_keys(locations)
"""

try:
    # Initiate the data population
    populate()
    """
    Main script to populate the next 12 hours data in the db.
    To be executed every alternate hour.
    Fetches -> Cleans -> Populates the data in the db.
    """

    # Set the status of the populate log to success
    update_row_single_where(
        "populate_logs", "status", "Success", "populate_id",
        last_insert_id("populate_logs", "populate_id")
        )
    print("Data populated successfully.")

except Exception as e:
    # Set the status of the populate log to failed
    update_row_single_where(
        "populate_logs", "status", "Failed", "populate_id",
        last_insert_id("populate_logs", "populate_id")
        )
    # Set the error message
    update_row_single_where(
        "populate_logs", "error_message", str(e), "populate_id",
        last_insert_id("populate_logs", "populate_id")
        )
    print("Error populating data.")
