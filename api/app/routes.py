from app import app
from app.database import get_user, write_user , Refresh_Token , check_refresh_token
from app.token import get_token, get_refresh_token
from app.newsapi import get_top_headlines
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
        token = get_token(user['_id']['$oid'])
        refresh_token = get_refresh_token(user['_id']['$oid'])
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

@app.route('/refresh_token',methods=['GET'])
@cross_origin()
def refresh_token():
    refreshtoken = request.cookies.get('refresh_token')
    if not refreshtoken:
        response = make_response({'token': None, 'error': True, 'message': 'Refresh Token Not Found'})
        return response , 401
    try:
        decoded = jwt.decode(refreshtoken,app.config['REFRESH_TOKEN_SECRET'], algorithms='HS256')
        isTokenFound = check_refresh_token(decoded["user_id"])
        if isTokenFound['refresh_token']:
            token = get_token(decoded["user_id"])
            refresh_token = get_refresh_token(decoded["user_id"])
            response = make_response({'token': token, 'error': False, 'message': 'Request Processed'})
            response.set_cookie('refresh_token', refresh_token, httponly=True)
            return response, 200
        else :
            response = make_response({'token': None, 'error': True, 'message': 'Invalid Refresh Token'})
            return response , 401

    except jwt.ExpiredSignatureError:
        response = make_response({'token': None, 'error': True, 'message': 'Refresh Token Expired'})
        return response , 401
    
    except Exception as e:
        # print('error', e)
        # e.with_traceback(e)
        return {'error': True, 'message': e.args[0]}, 401


@app.route('/headlines/<category>', methods=['GET'])
@cross_origin()
def headlines(category):
    headlines = get_top_headlines(category=category)
    if(headlines['error']):
        return headlines, 500
    return headlines