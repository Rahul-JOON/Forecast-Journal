<div align="center">

# Forecast Journal

</div>

<div align="center">

![Python](https://img.shields.io/badge/python-v3.9-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v16.0-blue)
![NeonDB](https://img.shields.io/badge/Database-NeonDB-green)
[![MIT License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

</div>

Forecast Journal is a dynamic project designed to fetch, store, and analyze weather forecasts, providing a foundation for data-driven insights and predictive modeling. The current implementation focuses on retrieving 12-hour temperature forecasts for specific target locations and storing them in a scalable database architecture hosted on [NeonDB](https://neon.tech/).

## Features
- **Real-time Forecast Retrieval**: Fetches 12-hour temperature forecasts for target locations via the [AccuWeather API](https://developer.accuweather.com/).
- **Efficient Storage**: Implements a 2D table schema in PostgreSQL for structured and scalable data storage.
- **Data Accessibility**: Lays groundwork for retrieving and analyzing forecast and actual temperature data over time.

---

## Technologies Used
- **Programming Language**: Python (using native syntax for data manipulation)
- **Database**: PostgreSQL (hosted on NeonDB)
- **API Handling**: Requests module
- **Data Manipulation**: Local Python syntax

---

## Next Steps

### 1. Front-end Development
Build an interactive and user-friendly front-end interface that:
- Displays temperature data and trends, highlighting the disparity or accuracy between predicted and actual temperatures.
- Includes a query field to enable users to download data for custom processing.

### 2. Machine Learning Model
Develop a machine learning model to:
- Train on monthly data patterns (rolling 30-day updates).
- Use the temporal patterns to predict future temperatures more accurately.
- Dynamically improve with new data, retraining at the end of each month.

---

## Documentation
Well-documented guides about the database schema, API usage, and scripts can be found in their respective folders:
- [API Documentation](./API/README.md)
- [Database Documentation](./db/README.md)
- [Scripts Documentation](./scripts/README.md)

---

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/forecast-journal.git
   ```
2. Install required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up the database:
   - Create a NeonDB account and configure the connection details.
   - Use the provided schema (`schema.sql`) to initialize the database.
4. Run the forecast retrieval script:
   ```bash
   python fetch_forecast.py
   ```

---

## Contributing
Contributions are welcome! If you have suggestions for new features or improvements, feel free to open an issue or submit a pull request.

---

## Future Vision
Forecast Journal aims to become a comprehensive tool for:
- **Weather Analysis**: Enabling researchers and enthusiasts to study temperature trends and forecast accuracy.
- **Predictive Modeling**: Leveraging machine learning to enhance the precision of weather predictions.
- **Open-Source Collaboration**: Fostering a community-driven project to tackle real-world weather prediction challenges.

---

## License
This project is licensed under the MIT License. See the [`LICENSE`](./LICENSE) file for details.

---

## Contact
For any inquiries or feedback, feel free to reach out:
- **Email**: rahul.2616412821@ipu.ac.in
- **GitHub**: [Rahul-JOON](https://github.com/Rahul-JOON)

