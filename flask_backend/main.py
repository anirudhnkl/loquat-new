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
@app.route('/user/portfolio/<user_id>')
def show_user_portfolio(user_id):
    # show the user portfolio for that user
    doc_ref = db.collection(u'users').document(user_id)
    try:
        doc = doc_ref.get()
        portfolio_name = doc.to_dict()['portfolio']
        print('Portfolio:'+ portfolio_name)
        stocks = db.collection(u'portfolio').document(portfolio_name).get().to_dict()['portfolio']

        portfolioList = {}
        stockObj = {}
        count = 1
        for stock, quantity in stocks.items():
            a = Stock(stock, token="pk_4552c3e208aa495ea2803d07e1b2feb0")
            stockObj['symbol'] = stock
            stockObj['price'] = a.get_price()
            stockObj['quantity'] = quantity

            portfolioList[str(count)] = (json.dumps(stockObj))
            count += 1
    except Exception as e:
        return str(e)

    return json.dumps(portfolioList)

@app.route('/user/groups/<user_id>')
def show_user_groups(user_id):
    # show the groups of the user
    doc_ref = db.collection(u'users').document(user_id)
    try:
        doc = doc_ref.get()
        groups = doc.to_dict()['groups']
        
        groupList = {}
        groupCapital = {}

        count = 1
        for name, amt in groups.items():
            portfolio_name = db.collection(u'groups').document(name).get().to_dict()['portfolio']
            stocks = db.collection(u'portfolio').document(portfolio_name).get().to_dict()['portfolio']

            capt = 0
            for stock, quantity in stocks.items():
                a = Stock(stock, token="pk_4552c3e208aa495ea2803d07e1b2feb0")
                capt = capt + (a.get_price() * int(quantity))
            
            groupCapital['name'] = name
            groupCapital['amt'] = amt
            groupCapital['value'] = capt
            
            groupList[str(count)] = (json.dumps(groupCapital))
            count += 1

    except Exception as e:
        return str(e)

    return json.dumps(groupList)

@app.route('/groups/portfolio/<group_id>')
def show_group_portfolio(group_id):
    # show the portfolio for a group
    doc_ref = db.collection(u'users').document(group_id)
    try:
        doc = doc_ref.get()
        portfolio_name = doc.to_dict()['portfolio']
        stocks = db.collection(u'portfolio').document(portfolio_name).get().to_dict()['portfolio']

        portfolioList = {}
        stockObj = {}
        count = 1
        for stock, quantity in stocks.items():
            a = Stock(stock, token="pk_4552c3e208aa495ea2803d07e1b2feb0")
            stockObj['symbol'] = stock
            stockObj['price'] = a.get_price()
            stockObj['quantity'] = quantity

            portfolioList[str(count)] = (json.dumps(stockObj))
            count += 1

    except Exception as e:
        return str(e)

    return json.dumps(portfolioList)

if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END gae_python37_app]


# # Extra:
# def show_user_groups(user_id):
#     # show the groups of the user
#     doc_ref = db.collection(u'users').document(user_id)
#     try:
#         doc = doc_ref.get()
#         groups = doc.to_dict()['groups']
        
#         groupList = {}
#         groupCapital = {}

#         count = 1
#         for group in groups.keys():
#             members = db.collection(u'groups').document(group).get().to_dict()['members']
#             amt = 0
#             for value in members.values():
#                 amt = amt + int(value)
            
#             groupCapital['name'] = group
#             groupCapital['group'] = amt
            
#             groupList[str(count)] = (json.dumps(groupCapital))
#             count += 1

#     except:
#         print(u'No such document!')
#         return "ERROR"

#     return json.dumps(groupList)