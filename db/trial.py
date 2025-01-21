from data_crud import insert_data


data = (("(location_id, location_name, unique_key)"),
        (1, "Bangalore", "BLR"),
        (2, "Hyderabad", "HYD"))
if insert_data("locations", data):
    print("Data inserted successfully.")
