from flask import Blueprint
from services.query_handler import get_range_temperature_data_by_city
import datetime as dt

views = Blueprint("views", __name__)


@views.route("/", methods=["GET"])
def home():
    city = "Najafgarh"
    start_date = dt.datetime.now().date().isoformat()
    end_date = "2025-03-28"

    try:
        temperature_data = get_range_temperature_data_by_city(
            city, start_date, end_date)
        # print(f"Temperature data: {temperature_data}")  # Debugging statement
        return f"<p>{temperature_data}<p>"
    except Exception as e:
        # print(f"Exception occurred: {str(e)}")  # Debugging statement
        return f"<p>{str(e)}<p>"
