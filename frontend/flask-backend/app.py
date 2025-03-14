from flask import Flask
from config.config import Config
from routes.views import views

app = Flask(__name__)
app.config.from_object(Config)


app.register_blueprint(views, url_prefix="/")

if __name__ == "__main__":
    app.run(port=app.config.get("DB_PORT"))
