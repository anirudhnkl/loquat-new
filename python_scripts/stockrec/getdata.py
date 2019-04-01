import pandas as pd
from sklearn.cluster import KMeans
import numpy as np
import requests


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
    colStr = "symbol,currency,country,downMonthPercentage,industry,subsector,twoYear,sixMonth,threeMonth,oneYearRisk,twoYearRisk,sinceStartDateRisk,a_sinceStartDateRisk,a_oneYearRisk,a_twoYearRisk"

    def getString(self):
        secStr = str(self.symbol) + ',' + str(self.currency) + ',' + str(self.country) + ',' + str(self.downMonthPercentage) + ',' + str(self.industry) + ',' + str(self.subsector) + ',' + str(self.twoYear) + ',' + str(self.sixMonth) + ',' + str(self.threeMonth) + ',' + str(self.oneYearRisk) + ',' + str(self.twoYearRisk) + ',' + str(self.sinceStartDateRisk) + ',' + str(self.a_sinceStartDateRisk)+ ',' + str(self.a_oneYearRisk) + ',' + str(self.a_twoYearRisk)
        return secStr

def retrieve_aladdin_data(symbol):
    performanceURL = "https://www.blackrock.com/tools/hackathon/performance"
    securityURL = "https://www.blackrock.com/tools/hackathon/security-data"
    PARAMS = {'identifiers':symbol} 
    curSec = Security()
    
    p = requests.get(url = performanceURL, params = PARAMS) 
    pData = p.json()['resultMap']['RETURNS'][0]
    s = requests.get(url = securityURL, params = PARAMS) 
    sData = s.json()['resultMap']['SECURITY'][0]
    try:
        latestPerf = pData['latestPerf']
    except:
        latestPerf = np.nan
    
    curSec.symbol = symbol
    try:
        curSec.downMonthPercentage = float(pData['downMonthsPercent'])
    except:
        curSec.downMonthPercentage = np.nan
    try:
        curSec.industry = sData['issFtse1Industry']
    except:
        curSec.industry = np.nan
    try:
        curSec.subsector = sData['issFtse4SubSector']
    except:
        curSec.subsector = np.nan

    try:
        curSec.sixMonth = latestPerf['sixMonth']
    except:
        curSec.sixMonth = np.nan
        
    try:
        curSec.threeMonth = latestPerf['threeMonth']
    except:
        curSec.threeMonth = np.nan
    try:
        curSec.twoYear = latestPerf['twoYear']
    except:
        curSec.twoYear = np.nan
    try:
        curSec.twoYearRisk = latestPerf['twoYearRisk']
    except:
        curSec.twoYearRisk = np.nan
    try:
        curSec.a_twoYearRisk = latestPerf['twoYearAnnualized']
    except:
        curSec.a_twoYearRisk = np.nan

    try:
        curSec.oneYearRisk = latestPerf['oneYearRisk']
    except:
        curSec.oneYearRisk = np.nan

    try:
        curSec.sinceStartDateRisk = latestPerf['sinceStartDateRisk']
    except:
        curSec.sinceStartDateRisk = np.nan

    try:
        curSec.a_sinceStartDateRisk = latestPerf['sinceStartDateRiskAnnualized']
    except:
        curSec.a_sinceStartDateRisk = np.nan

    try:
        curSec.a_oneYearRisk = latestPerf['oneYearRiskAnnualized']
    except:
        curSec.a_oneYearRisk = np.nan
            

    try:
        curSec.currency = sData['currency']
    except:
        curSec.currency = np.nan
    try:
        curSec.country = sData['country']
    except:
        curSec.country = np.nan
    return curSec

df = pd.read_csv("companylist.csv", usecols=[0])

inp = int(input('Enter stuff'))
inp = inp * 100
start = inp - 100
name = "c_" + str(inp) + ".csv"
f = open(name, "a")

# for i in range(start, inp):
#     symbol = df['Symbol'][i]
#     print(i, " ", symbol)
#     curSec = retrieve_aladdin_data(symbol)
#     f.write(curSec.getString())
#     f.write('\n')
# f.close()

# def calculateClusters:
#     df = pd.read_csv("companydata.csv")

