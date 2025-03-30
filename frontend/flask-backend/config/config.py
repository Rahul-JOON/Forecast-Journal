import os
from dotenv import load_dotenv


class Config:
    """
    Configuration class for the Flask app.
    """
    load_dotenv()
    DB_PORT = os.getenv("DB_PORT")
    DEBUG = os.getenv("DEBUG")
    SECRET_KEY = os.getenv("SECRET_KEY")
