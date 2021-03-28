from app import app, mongo
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import cross_origin
from flask import request, make_response, jsonify
import json
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
        print('data is', json_data)
        user = mongo.db.users.find_one({'email': json_data['email']})
        print('user is', user)
        if not user:
            raise Exception('No user found')
        correct_password = check_password_hash(
            user['password'], json_data['password'])
        if not correct_password:
            raise Exception('Incorrect password')
        token = jwt.encode({'user_id': user['_id'],
                            'exp': datetime.utcnow() + timedelta(minutes=app.config['TOKEN_VALIDITY_MINUTES']),
                            'iat': datetime.utcnow()},
                           app.config['TOKEN_SECRET'], algorithm='HS256')
        refresh_token = jwt.encode({'user_id': user['_id'],
                                   'exp': datetime.utcnow() + timedelta(days=app.config['REFRESH_TOKEN_VALIDITY_DAYS']),
                                    'iat': datetime.utcnow()},
                                   app.config['TOKEN_SECRET'], algorithm='HS256')
        response = make_response({'success': True, 'error': False, 'token': token})
        response.set_cookie('refresh_token', refresh_token, httponly=True)
        return response, 200
    except Exception as e:
        print('error', e)
        e.with_traceback(e)
        return {'successs': False, 'error': True}, 401


@app.route('/signup', methods=['POST'])
@cross_origin()
def signup():
    try:
        json_data = request.get_json(force=True)
        json_data['password'] = generate_password_hash(
            json_data['password'], salt_length=12)
        mongo.db.users.insert_one(json_data)
        return {'success': True, 'error': False}
    except Exception as e:
        print(e)
        return {'success': False, 'error': True}, 401
