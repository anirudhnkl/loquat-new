from sklearn.cluster import KMeans
import numpy as np
import pandas as pd
from sklearn import preprocessing

df = pd.read_csv("compdata.csv")
df.set_index('symbol', inplace=True)
del df['currency']
df.dropna(inplace=True)

le = preprocessing.LabelEncoder()
df['country'] = le.fit_transform(df['country'])
df['industry'] = le.fit_transform(df['industry'])
df['subsector'] = le.fit_transform(df['subsector'])

df = df.iloc[:,4:]
print(df.head())

kmeans = KMeans(n_clusters=3).fit(df.values)