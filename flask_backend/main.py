# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START gae_python37_app]
from flask import Flask
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from iexfinance.stocks import Stock
from flask_cors import CORS
import json

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)
CORS(app)

# Use a service account
cred = credentials.Certificate("Loquat-a526045a3f62.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

@app.route('/')
def hello():
    """Return a friendly HTTP greeting."""
    return 'Hello World!'

# https://loquat.appspot.com
@app.route('/user/<user_id>')
def show_user_profile(user_id):
    # show the user profile for that user
    doc_ref = db.collection(u'users').document(user_id)
    try:
        doc = doc_ref.get()
        portfolio_name = doc.to_dict()['portfolio']
        print('Portfolio:'+ portfolio_name)
        stocks = db.collection(u'portfolio').document(portfolio_name).get().to_dict()['portfolio']

        portfolioList = []
        stockObj = {}
        for stock, quantity in stocks.items():
            a = Stock(stock, token="pk_4552c3e208aa495ea2803d07e1b2feb0")
            stockObj['symbol'] = stock
            stockObj['price'] = a.get_price()
            stockObj['quantity'] = quantity
            portfolioList.append(json.dumps(stockObj))
    except:
        print(u'No such document!')
        return "ERROR"

    return str(portfolioList)

@app.route('/group/<group_id>')
def show_post(group_id):
    # show the post with the given id, the id is an integer
    return 'Group %s' % group_id


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END gae_python37_app]
