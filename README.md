<div align="center">

# 🌦️ Forecast Journal

![Python](https://img.shields.io/badge/python-v3.9-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v16.0-blue)
![NeonDB](https://img.shields.io/badge/Database-NeonDB-green)
[![MIT License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

**A data-driven approach to tracking and improving temperature forecast accuracy.**

</div>

---

## 🚀 Overview  
Forecast Journal fetches **12-hour temperature forecasts** from the [AccuWeather API](https://developer.accuweather.com/) and logs them in a structured PostgreSQL database hosted on **NeonDB**. The system allows analysis of prediction accuracy over time.

With the newly implemented **frontend dashboard**, users can now **visualize trends** and **download historical data** for further analysis.

---

## ✨ Features  
✅ **Weather Data Collection**: Automated fetching of forecasts at regular intervals.  
✅ **Database Storage**: Structured storage of forecasted vs. actual temperatures.  
✅ **Logging System**: Tracks API and database transactions in a structured format.  
✅ **Frontend Dashboard**: Visual representation of forecast accuracy trends.  
✅ **Downloadable Data**: Users can retrieve historical forecast accuracy data.  

---

## 📊 Frontend Dashboard  
The frontend, built with **React + TypeScript**, provides interactive data visualizations. It includes:
- 📈 **Time Series Chart** – Predicted vs. Actual temperatures.
- 📊 **Error Distribution Histogram** – Frequency of forecast errors.
- 🔥 **Error Heatmap** – Displays error magnitude over time.

**Hosting:**  
- **Frontend (React)** – Hosted on **Vercel**  
- **Backend API (Flask)** – Hosted on **Render**  

---

## 🔮 Future Vision  
The next step is **implementing an ML model** to refine predictions. The model will:
- 📊 **Train on past data monthly** to improve future forecasts.
- 📈 **Learn temporal patterns** to adjust inaccuracies dynamically.
- 🔄 **Continuously update** based on the latest 30-day data.

---


## 📜 Documentation  
📁 **[API Docs](api/README.md)** – Details on how forecasts are fetched.  
📁 **[Database Docs](db/README.md)** – Explanation of the storage schema.  
📁 **[Scripts Docs](scripts/README.md)** – Background automation tasks.  
📁 **[Frontend Docs](frontend/README.md)** – UI and API integration details.  

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

## 👨‍💻 Contributions & Feedback  
Contributions are welcome! Feel free to open an issue for suggestions or improvements. 🚀