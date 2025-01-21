from db.data_crud import insert_data
from api.key_processor import load_location_keys
from db.data_crud import row_existence_check, get_location_id
import json

data = (("(location_id, location_name, unique_key)"),
        (1, "Bangalore", "BLR"),
        (2, "Hyderabad", "HYD"))
if insert_data("locations", data):
    print("Data inserted successfully.")

location_keys = load_location_keys()

for location in location_keys:
    if row_existence_check("locations", "location_name", location):
        print(f"{location} exists in the database.")
    else:
        print(f"{location} does not exist in the database.")

for location in location_keys:
    print(get_location_id(location))


with open("populate.txt") as f:
    data = f.read()

db_format_data = json.loads(data)
for location in db_format_data:
    data = (("(forecast_for_hour, forecast_made_at, temperature)"),)
    for i in db_format_data[location]:
        data += (i[0:3],)
    print(data)
    break
