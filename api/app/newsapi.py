from app import app
import requests

headers={app.config['NEWS_API_SECRET']: app.config['NEWS_API_KEY'],
        'Accept': 'application/json',
        'Content-Type': 'application/json'}

headlines_endpoint = 'https://newsapi.org/v2/top-headlines'

default_params = {'language': 'en','sortBy': 'popularity', 'country': 'in'}


def get_top_headlines(pageSize=100, page=None, category='general'):

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