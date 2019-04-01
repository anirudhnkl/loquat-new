import datetime as dt
import math

import fix_yahoo_finance as yf
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import tweepy
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import requests

from matplotlib import style
from sklearn import preprocessing
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from textblob import TextBlob
from scipy.interpolate import interp1d

import constants as ct
from Tweet import Tweet

style.use('ggplot')

class Security:
    symbol = ''
    currency = ''
    country = ''
    downMonthPercentage = None
    industry = ''
    subsector = ''
    twoYear = None
    sixMonth = None
    threeMonth =  None
    oneYearRisk = None
    twoYearRisk = None
    sinceStartDateRisk = None
    a_sinceStartDateRisk = None
    a_oneYearRisk = None
    a_twoYearRisk = None
    name = ''

def translate(value, leftMin, leftMax, rightMin, rightMax):
    # Figure out how 'wide' each range is
    leftSpan = leftMax - leftMin
    rightSpan = rightMax - rightMin

    # Convert the left range into a 0-1 range (float)
    valueScaled = float(value - leftMin) / float(leftSpan)

    # Convert the 0-1 range into a value in the right range.
    return rightMin + (valueScaled * rightSpan)

def check_stock_symbol(symbol, flag=False, companies_file='companylist.csv'):
    df = pd.read_csv(companies_file, usecols=[0,1])
    while flag is False:
        for index in range(len(df)):
            if df['Symbol'][index] == symbol:
                flag = True
                name = df['Name'][index]
    return flag, symbol, name
    # return True, 'AAPL', 'Apple Inc.'


def get_stock_data(symbol, from_date, to_date):
    data = yf.download(symbol, start=from_date, end=to_date)
    df = pd.DataFrame(data=data)
    df = df[['Open', 'High', 'Low', 'Close', 'Volume']]
    df['HighLoad'] = (df['High'] - df['Close']) / df['Close'] * 100.0
    df['Change'] = (df['Close'] - df['Open']) / df['Open'] * 100.0

    df = df[['Close', 'HighLoad', 'Change', 'Volume']]
    return df


def stock_forecasting(df):
    forecast_col = 'Close'
    forecast_out = int(math.ceil(0.1*len(df)))
    df['Label'] = df[[forecast_col]].shift(-forecast_out)

    X = np.array(df.drop(['Label'], axis=1))
    X = preprocessing.scale(X)
    X_forecast = X[-forecast_out:]
    X = X[:-forecast_out]

    df.dropna(inplace=True)
    y = np.array(df['Label'])

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5)

    clf = LinearRegression(n_jobs=-1)
    clf.fit(X_train, y_train)
    accuracy = clf.score(X_test, y_test)
    forecast = clf.predict(X_forecast)

    df['Prediction'] = np.nan

    last_date = df.iloc[-1].name
    last_date = dt.datetime.strptime(str(last_date), "%Y-%m-%d %H:%M:%S")

    for pred in forecast:
        last_date += dt.timedelta(days=1)
        df.loc[last_date.strftime("%Y-%m-%d")] = [np.nan for _ in range(len(df.columns) - 1)] + [pred]
    return df, forecast_out


def forecast_plot(df):
    df['Close'].plot(color='black')
    df['Prediction'].plot(color='green')
    plt.legend(loc=4)
    plt.xlabel('Date')
    plt.ylabel('Price')
    plt.show()

def retrieve_aladdin_data(symbol):
    performanceURL = "https://www.blackrock.com/tools/hackathon/performance"
    securityURL = "https://www.blackrock.com/tools/hackathon/security-data"
    PARAMS = {'identifiers':symbol} 
    curSec = Security()
    p = requests.get(url = performanceURL, params = PARAMS) 
    pData = p.json()['resultMap']['RETURNS'][0]
    # s = requests.get(url = securityURL, params = PARAMS) 
    # sData = s.json()['resultMap']['SECURITY'][0]
    
    # curSec.symbol = symbol
    # try:
    #     latestPerf = pData['latestPerf']
    # except:
    #     latestPerf = np.nan
    
    curSec.symbol = symbol
    try:
        curSec.downMonthPercentage = float(pData['downMonthsPercent'])
    except:
        curSec.downMonthPercentage = np.nan
    # try:
    #     curSec.industry = sData['issFtse1Industry']
    # except:
    #     curSec.industry = np.nan
    # try:
    #     curSec.subsector = sData['issFtse4SubSector']
    # except:
    #     curSec.subsector = np.nan

    # try:
    #     curSec.sixMonth = latestPerf['sixMonth']
    # except:
    #     curSec.sixMonth = np.nan
        
    # try:
    #     curSec.threeMonth = latestPerf['threeMonth']
    # except:
    #     curSec.threeMonth = np.nan
    # try:
    #     curSec.twoYear = latestPerf['twoYear']
    # except:
    #     curSec.twoYear = np.nan
    # try:
    #     curSec.twoYearRisk = latestPerf['twoYearRisk']
    # except:
    #     curSec.twoYearRisk = np.nan
    # try:
    #     curSec.a_twoYearRisk = latestPerf['twoYearAnnualized']
    # except:
    #     curSec.a_twoYearRisk = np.nan

    # try:
    #     curSec.oneYearRisk = latestPerf['oneYearRisk']
    # except:
    #     curSec.oneYearRisk = np.nan

    # try:
    #     curSec.sinceStartDateRisk = latestPerf['sinceStartDateRisk']
    # except:
    #     curSec.sinceStartDateRisk = np.nan

    # try:
    #     curSec.a_sinceStartDateRisk = latestPerf['sinceStartDateRiskAnnualized']
    # except:
    #     curSec.a_sinceStartDateRisk = np.nan

    # try:
    #     curSec.a_oneYearRisk = latestPerf['oneYearRiskAnnualized']
    # except:
    #     curSec.a_oneYearRisk = np.nan
            

    # try:
    #     curSec.currency = sData['currency']
    # except:
    #     curSec.currency = np.nan
    # try:
    #     curSec.country = sData['country']
    # except:
    #     curSec.country = np.nan
    # return curSec

    return curSec

def get_approval_rating(name):
    try:
        gcskey = 'AIzaSyC4sVIvx5-UYTWx3dPUUrGeXVacRLb6y0k'
        gcsURL = 'https://www.googleapis.com/customsearch/v1'
        gcsid = '017038638679879434582:wmubo130g28'
        PARAMS = {'key':gcskey, 'cx': gcsid, 'q': name} 
        gdUrl = requests.get(url = gcsURL, params = PARAMS).json()['items'][0]['formattedUrl']

        req = Request(gdUrl, headers={'User-Agent': 'Mozilla/5.0'})
        webpage = urlopen(req).read().decode("utf8")
        html = BeautifulSoup(webpage, 'html.parser')
        ceo_approval = html.find("div", {"id": "EmpStats_Approve"})['data-percentage']
    except:
        ceo_approval = 60

    return int(ceo_approval)



def retrieving_tweets_polarity(symbol):
    try:
        auth = tweepy.OAuthHandler(ct.consumer_key, ct.consumer_secret)
        auth.set_access_token(ct.access_token, ct.access_token_secret)
        user = tweepy.API(auth)
        tweets = tweepy.Cursor(user.search, q=str(symbol), tweet_mode='extended', lang='en').items(ct.num_of_tweets)
        tweet_list = []
        global_polarity = 0
        for tweet in tweets:
            tw = tweet.full_text
            blob = TextBlob(tw)
            polarity = 0
            for sentence in blob.sentences:
                polarity += sentence.sentiment.polarity
                global_polarity += sentence.sentiment.polarity
            tweet_list.append(Tweet(tw, polarity))

        global_polarity = global_polarity / len(tweet_list)
    except:
        global_polarity = 0.2
    return global_polarity


def recommending(df, forecast_out, global_polarity, ceo_approval, downMonths):
    # print('CLOSE ', df.iloc[-forecast_out-1]['Close'], 'PREDICTION: ', df.iloc[-1]['Prediction'], 'pol: ', global_polarity)
    predicted_gain = df.iloc[-1]['Prediction'] - df.iloc[-forecast_out-1]['Close']
    weights = [0.7, 0.15, 0.05, 0.1]
    #TO DO, different weights for diff factors
    if predicted_gain > 19:
        predicted_gain = 19
    if predicted_gain < -19:
        predicted_gain = -19
    m1 = interp1d([-19,19],[0,100])
    mpredicted_gain = m1(predicted_gain)
    m2 = interp1d([-0.5, 0.5], [0, 100])
    mpolarity = m2(global_polarity)
    values = [mpredicted_gain, mpolarity, ceo_approval, 100*downMonths]
    score = 0.0
    for i in range(4):
        score += values[i]*weights[i]
    score = score/10
    return score

def init(tickers):
    # tickers = ['AAPL', 'AMD', 'GOOG', 'MSFT', 'ATOS', 'AUTO', 'ATXI', 'CSCO', 'CTRN', 'CRAY']
    scoreDict = []
    for t in tickers:
        symbol = t
        (flag, symbol, name) = check_stock_symbol(symbol, False, 'companylist.csv')
        if flag:
            actual_date = dt.date.today()
            past_date = actual_date - dt.timedelta(days=365 * 1.5)
            actual_date = actual_date.strftime("%Y-%m-%d")
            past_date = past_date.strftime("%Y-%m-%d")

            # print("Retrieving Stock Data from introduced symbol...")
            dataframe = get_stock_data(symbol, past_date, actual_date)
            # print("Forecasting stock DataFrame...")
            (dataframe, forecast_out) = stock_forecasting(dataframe)
            # print("Plotting existing and forecasted values...")
            # forecast_plot(dataframe)
            # print("Retrieving %s related tweets polarity..." % symbol)
            polarity = retrieving_tweets_polarity(symbol)
            # print("Generating recommendation based on prediction & polarity...")
            curSec = retrieve_aladdin_data(symbol)
            ceo_approal = get_approval_rating(name)
            score = recommending(dataframe, forecast_out, polarity, ceo_approal, curSec.downMonthPercentage)
            scoreDict.append((score, symbol))
    scoreDict.sort(key=lambda tup: tup[0], reverse=True)
    print(scoreDict)


if __name__ == "__main__":
    tickers = ['AAPL', 'AMD', 'GOOG', 'MSFT', 'ATOS', 'AUTO', 'ATXI', 'CSCO', 'CTRN', 'CRAY']
    init(tickers)
#     for t in tickers:
#         symbol = t
#         (flag, symbol, name) = check_stock_symbol(symbol, False, 'companylist.csv')
#         if flag:
#             actual_date = dt.date.today()
#             past_date = actual_date - dt.timedelta(days=365 * 1.5)
#             actual_date = actual_date.strftime("%Y-%m-%d")
#             past_date = past_date.strftime("%Y-%m-%d")

#             # print("Retrieving Stock Data from introduced symbol...")
#             dataframe = get_stock_data(symbol, past_date, actual_date)
#             # print("Forecasting stock DataFrame...")
#             (dataframe, forecast_out) = stock_forecasting(dataframe)
#             # print("Plotting existing and forecasted values...")
#             # forecast_plot(dataframe)
#             # print("Retrieving %s related tweets polarity..." % symbol)
#             polarity = retrieving_tweets_polarity(symbol)
#             # print("Generating recommendation based on prediction & polarity...")
#             curSec = retrieve_aladdin_data(symbol)
#             ceo_approal = get_approval_rating(name)
#             score = recommending(dataframe, forecast_out, polarity, ceo_approal, curSec.downMonthPercentage)
#             print(score)


