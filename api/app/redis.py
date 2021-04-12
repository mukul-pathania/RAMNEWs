from app import app
from redis import Redis
import sys



def redis_connect():
    try:
        client = Redis(**app.config['REDIS_SETUP'])
        ping = client.ping()
        if ping is True:
            return client
        else:
            raise Exception('Could not connect to Redis')
    except Exception as e:
        print(e)
        sys.exit(1)



redis_client = redis_connect()


def get_from_cache(key):
    return redis_client.get(key)

def set_to_cache(key, value, expiry=1800):
    return redis_client.setex(key, time=expiry, value=value)

