from app import app
from app.database import get_user_by_email, write_user , Refresh_Token , check_refresh_token, delete_refresh_token, get_user_by_id
from app.token import get_token, get_refresh_token, token_required
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
        user_data = get_user_by_email(json_data)
        if not user_data['user']:
            raise Exception(user_data['message'])
        user = user_data['user']
        token = get_token(user['_id']['$oid'])
        refresh_token = get_refresh_token(user['_id']['$oid'])
        response = make_response({'token': token, 'error': False, 'message': 'Logged in successfully'})
        response.headers.add('Set-Cookie', f'refresh_token={refresh_token}; HttpOnly; SameSite=None; Secure')
        return response, 200

    except Exception as e:
        print('error', e)
        # e.with_traceback(e)
        return {'error': True, 'message': e.args[0]}, 401


@app.route('/logout', methods=['GET'])
@cross_origin()
def logout():
    refresh_token = request.cookies.get('refresh_token')
    response = make_response({'error': False, 'message': 'User logged Out Successfully.'})
    if not refresh_token:
        return response
    try:
        decoded = jwt.decode(refresh_token, app.config['REFRESH_TOKEN_SECRET'], algorithms='HS256')
        delete_refresh_token(decoded["user_id"])
    except Exception as e:
        print(e)
    finally:
        response.headers.add('Set-Cookie', f'refresh_token=''; HttpOnly; SameSite=None; Max-Age=0; Secure')
        return response



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
            response.headers.add('Set-Cookie', f'refresh_token={refresh_token}; HttpOnly; SameSite=None; Secure')
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
@token_required
def headlines(category):
    if category not in ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']:
        return {'message': 'Incorrect category provided', 'error': True}, 404
    headlines = get_top_headlines(category=category)
    if(headlines['error']):
        return headlines, 500
    return headlines

@app.route('/user_info', methods=['GET'])
@cross_origin()
@token_required
def user_info():
    try:
        token = None
        #Authorization : Bearer <token>
        token = request.headers['Authorization'].split()[1]
        data = jwt.decode(token, app.config['TOKEN_SECRET'], algorithms='HS256')
        user = get_user_by_id(data['user_id'])
        if not user:
            return {'message': 'Cannot find User', 'error': True}
    except jwt.ExpiredSignatureError:
        return {'message': 'Token Expired', 'error': True}, 401
    except Exception as e:
        print(e)
        return {'message': 'An error occured while processing your request', 'error': True}, 401

    return {'user': user, 'error': False}
    
