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