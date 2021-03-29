from app import app
import pymongo
from werkzeug.security import check_password_hash, generate_password_hash
from bson import json_util
import json

#Connection with mongodb
db = pymongo.MongoClient(app.config['MONGO_URI']).get_database()

#Users collection
Users = db.users
#create an index on the email field
Users.create_index([('email', pymongo.ASCENDING)], unique=True)

#Refresh Token collection
Refresh_Token = db.refresh_token



def get_user(user_data):
    try:
        user = Users.find_one({'email': user_data['email']})
    
        if not user:
            return {'user': None, 'message': 'No user found'}
        
        password_correct = check_password_hash(user['password'], user_data['password'])
        if not password_correct:
            return {'user': None, 'message': 'Incorrect password'}

        #sanitize the result so that it can be json serializable
        user = json.loads(json_util.dumps(user))
        return {'user': user, 'message': 'User found successfully'}
    
    except Exception as e:
        return{'user': None, 'message': 'An error occured while processing your request'}



def write_user(user_data):
    try:
        user_data['password'] = generate_password_hash(user_data['password'], salt_length=12)
        user = Users.insert_one(user_data)
        #sanitize the result so that it can be json serializable
        user_id = json.loads(json_util.dumps(user.inserted_id))
        return {'user_id': user_id, 'message': 'User Created Successfully'}
    
    except pymongo.errors.DuplicateKeyError as e:
        return {'user_id': None, 'message': 'User already exists'}
    
    except Exception as e:
        print(e)
        return {'user_id': None, 'message': 'An error occured while processing the request'}
