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
✅ **ML Prediction Model**: Refines temperature forecasts using temporal patterns.

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

## 🤖 ML Model Integration  
The ML model has been implemented at [TempCastRNN](https://github.com/Rahul-JOON/TempCastRNN), a transformer-based time series model that:

- 📊 **Processes 12×12 forecast matrices** leveraging data from Forecast Journal.
- 📈 **Uses temporal attention** to learn patterns in forecast changes over time.
- 🔄 **Corrects inaccuracies** in 12-hour forecasts with low average error (~1.7°C).
- 🧠 **Implements causal masking** to ensure predictions use only available data.
- 📉 **Demonstrates improved accuracy** through time-aware deep learning techniques.

Recent evaluation shows the model achieves an MAE of 1.698°C and RMSE of 2.017°C, effectively refining traditional weather forecasts.

---

## 🔮 Future Vision  
The next step is **improving the ML model** to refine predictions further. The goal is to:
- Collect more data points for training.
- Enhance the model's architecture for better accuracy.

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