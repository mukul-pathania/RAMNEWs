from app import app
from redis import Redis

redis_client = Redis(**app.config['REDIS_SETUP'])


def get_from_cache(key):
    return redis_client.get(key)

def set_to_cache(key, value, expiry=1800):
    return redis_client.setex(key, time=expiry, value=value)

