from app import app
from app.database import Refresh_Token
from datetime import datetime, timedelta
import jwt


def get_token(user):
    try:
        token = jwt.encode({'user_id': user['_id']['$oid'],
                            'exp': datetime.utcnow() + timedelta(minutes=app.config['TOKEN_VALIDITY_MINUTES']),
                            'iat': datetime.utcnow()},
                        app.config['TOKEN_SECRET'], algorithm='HS256')
        return token

    except Exception as e:
        print(e)
        return None


def get_refresh_token(user):
    try:
        user_id = user['_id']['$oid']
        token = jwt.encode({'user_id': user_id,
                                    'exp': datetime.utcnow() + timedelta(days=app.config['REFRESH_TOKEN_VALIDITY_DAYS']),
                                    'iat': datetime.utcnow()},
                                app.config['REFRESH_TOKEN_SECRET'], algorithm='HS256')
        #delete any refresh token that exists with the user.
        Refresh_Token.delete_many({'user_id': user_id})
        
        #Then insert a new one associated with the user
        Refresh_Token.insert_one({'user_id': user_id, 'token': token})
        return token

    except Exception as e:
        print(e)
        return None