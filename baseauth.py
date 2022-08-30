import requests
from requests.auth import HTTPBasicAuth

auth = HTTPBasicAuth(username='Staff1', password='1')
response = requests.get('http://127.0.0.1:8000/api/projects/', auth=auth)
print(response.json())