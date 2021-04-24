from app import app
from app.database import Refresh_Token, delete_refresh_token
from flask import request
from datetime import datetime, timedelta
from functools import wraps
import jwt


def get_token(user_id):
    try:
        token = jwt.encode({'user_id': user_id,
                            'exp': datetime.utcnow() + timedelta(minutes=app.config['TOKEN_VALIDITY_MINUTES']),
                            'iat': datetime.utcnow()},
                        app.config['TOKEN_SECRET'], algorithm='HS256')
        return token

    except Exception as e:
        print(e)
        return None


def get_refresh_token(user_id):
    try:
        token = jwt.encode({'user_id': user_id,
                                    'exp': datetime.utcnow() + timedelta(days=app.config['REFRESH_TOKEN_VALIDITY_DAYS']),
                                    'iat': datetime.utcnow()},
                                app.config['REFRESH_TOKEN_SECRET'], algorithm='HS256')
        #delete any refresh token that exists with the user.
        delete_refresh_token(user_id)
        #Then insert a new one associated with the user
        Refresh_Token.insert_one({'user_id': user_id, 'token': token})
        return token

    except Exception as e:
        print(e)
        return None


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        try:
            token = None
            if 'Authorization' in request.headers:
                #Authorization : Bearer <token>
                token = request.headers['Authorization'].split()[1]
            if not token:
                return {'message': 'Token not found', 'error': True}, 401
            data = jwt.decode(token, app.config['TOKEN_SECRET'], algorithms='HS256')
        except jwt.ExpiredSignatureError:
            return {'message': 'Token Expired', 'error': True}, 401
        except Exception as e:
            print(e)
            return {'message': 'An error occured while processing your request', 'error': True}, 401
    
        return f(*args, **kwargs)
    
    return decorator