from flask import Blueprint, request, jsonify
from services.query_handler import chart_data_by_city_and_date_range
from services.data_formatter import convert_db_data_to_frontend_json
import datetime as dt
# import datetime as dt

views = Blueprint("views", __name__)


@views.route("/home", methods=["GET", "POST"])
def home():
    if request.method == "GET":
        city = "Najafgarh"
        start_date = "2025-02-01"
        end_date = dt.datetime.now().strftime("%Y-%m-%d")
    elif request.method == "POST":
        data = request.get_json()
        city = data.get("city")
        start_date = data.get("start_date")
        end_date = data.get("end_date")
        # print(f"{data}")  # Debugging statement

    try:
        temperature_data = chart_data_by_city_and_date_range(
            city, start_date, end_date)
        # print(f"Temperature data: {temperature_data}")  # Debugging statement
        # print(convert_db_data_to_frontend_json(temperature_data)) # Debugging
        return jsonify(convert_db_data_to_frontend_json(temperature_data))

    except Exception as e:
        print(f"Exception occurred: {str(e)}")  # Debugging statement
        return f"<p>{str(e)}<p>"
