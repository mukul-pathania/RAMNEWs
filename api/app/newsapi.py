from app import app
from app.redis import get_from_cache, set_to_cache
import json
import requests

headers={'X-Api-Key': app.config['NEWS_API_KEY'],
        'Accept': 'application/json',
        'Content-Type': 'application/json'}

headlines_endpoint = 'https://newsapi.org/v2/top-headlines'

default_params = {'language': 'en','sortBy': 'popularity', 'country': 'in'}


def request_top_headlines(pageSize=100, page=None, category='general'):

    params = {'pageSize': pageSize, 'category': category, **default_params}
    if page:
        params['page'] = page

    try:
        response = requests.get(headlines_endpoint, params=params, headers=headers)
        json_response = response.json()
        if not response.status_code == 200 or json_response['status'] != 'ok':
            return {'error': True, 'message': 'Bad Request'}
        
        return {**json_response, 'message': 'Request successful', 'error': False}
    
    except Exception as e:
        print(e)
        return {'message': 'An error occured while processing your request', 'error': True}

def get_top_headlines(pageSize=100, page=None, category='general'):
    cache_key = (str(pageSize) if pageSize else '') + (str(page) if page else '') + category
    headline_data = get_from_cache(cache_key)
    if headline_data:
        headline_data = json.loads(headline_data)
        headline_data['cache'] = True
        # print('serving from cache')
        return headline_data
    
    else:
        # print('can\'t serve from cache making api call')
        headline_data = request_top_headlines(pageSize=pageSize, page=page, category=category)
        #If we didn't get back an proper response don't write it into cache
        if headline_data['error']:
            return headline_data
        set_to_cache(key=cache_key, value=json.dumps(headline_data), expiry=app.config['REDIS_HEADLINE_CACHE_DURATION'])
        headline_data['cache'] = False
        return headline_data