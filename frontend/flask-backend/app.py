from flask import Flask
from flask_cors import CORS
from config.config import Config
from routes.views import views
from dotenv import load_dotenv
import os

app = Flask(__name__)
app.config.from_object(Config)
load_dotenv()

# Configure CORS to allow requests from your React app
CORS(app, resources={
    r"/*": {
        "origins": [
            os.getenv('FRONTEND_URL'),  # React dev server
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})


app.register_blueprint(views, url_prefix="/")

if __name__ == "__main__":
    app.run(port=app.config.get("DB_PORT"))
