import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dhfaodnou;ckfdk98034fcsdfdas'
    CORS_HEADERS = 'Content-Type'
    MONGO_URI = os.environ.get('MONGO_URI')
    TOKEN_SECRET = os.environ.get('TOKEN_SECRET') or 'adfadoic890854yuAFASFVASD045405T;FAadafaAaDFADAS'
    REFRESH_TOKEN_SECRET = os.environ.get('REFRESH_TOKEN_SECRET') or 'kjfyhasbdf98754FHKSFY9845HKFADSFSFSD0-9+/*-'
    TOKEN_VALIDITY_MINUTES = int(os.environ.get('TOKEN_VALIDITY_MINUTES')) or 15
    REFRESH_TOKEN_VALIDITY_DAYS = int(os.environ.get('REFRESH_TOKEN_VALIDITY_DAYS')) or 2
    CORS_METHODS = ['POST','GET']
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS') or 'http://localhost:3000'
    CORS_SUPPORTS_CREDENTIALS = True
    REDIS_SETUP = {'host': os.environ.get('REDIS_HOST', 'localhost'), 
                   'port': os.environ.get('REDIS_PORT', 6379),
                   'db': os.environ.get('REDIS_DATABASE', 0), 
                   'password': os.environ.get('REDIS_PASSWORD')}
    NEWS_API_KEY = os.environ.get('NEWS_API_KEY')
    NEWS_API_SECRET = os.environ.get('NEWS_API_SECRET')
    REDIS_HEADLINE_CACHE_DURATION = os.environ.get('REDIS_HEADLINE_CACHE_DURATION', 1800)