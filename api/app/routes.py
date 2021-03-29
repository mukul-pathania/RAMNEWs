from app import app
from app.database import get_user, write_user
from app.token import get_token, get_refresh_token
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import cross_origin
from flask import request, make_response, jsonify
import jwt
from datetime import datetime, timedelta


@app.route('/ping')
def ping():
    return 'pong'


@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    try:
        json_data = request.get_json(force=True)
        user_data = get_user(json_data)
        if not user_data['user']:
            raise Exception(user_data['message'])
        user = user_data['user']
        token = get_token(user)
        refresh_token = get_refresh_token(user)
        response = make_response({'token': token, 'error': False, 'message': 'Logged in successfully'})
        response.set_cookie('refresh_token', refresh_token, httponly=True)
        return response, 200

    except Exception as e:
        # print('error', e)
        # e.with_traceback(e)
        return {'error': True, 'message': e.args[0]}, 401


@app.route('/signup', methods=['POST'])
@cross_origin()
def signup():
    json_data = request.get_json(force=True)
    user_data = write_user(json_data)
    if not user_data['user_id']:
        return {'error': True, 'message': user_data['message']}, 409
    return {'error': False, 'message': user_data['message']}
