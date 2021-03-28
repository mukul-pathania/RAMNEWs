from flask import Flask
from flask_cors import CORS
from config import Config
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config.from_object(Config)
cors = CORS(app)
mongo = PyMongo(app)

from app import routes
