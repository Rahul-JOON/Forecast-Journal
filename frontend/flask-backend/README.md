# 🔥 Flask Backend  

This is the **backend API** for the Forecast Journal frontend. It handles:  
✅ Serving **temperature forecast data** for visualization.  
✅ **Querying data** based on a requested date range.  
✅ Future support for **CSV downloads** of forecast accuracy.  

## 📌 API Routes  

| Method | Route  | Description |
|--------|--------|-------------|
| **GET** | `/`  | Returns **Najafgarh's** forecast data for the **current month**. |
| **POST** | `/`  | Accepts a **date range**, fetches data via `queryhandler.py`, and returns the requested forecast history. |
| *(Future)* | `/download`  | **(Planned)** Will allow CSV export of forecast accuracy. |

## 🔧 Implementation Details  
- Uses **Flask** as the backend framework.  
- Queries PostgreSQL database using `queryhandler.py`.  
- Returns JSON response to the **React frontend**.  

## 🚀 Hosting  
- **Live on Render**  

---
