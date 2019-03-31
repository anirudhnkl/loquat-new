from sklearn.cluster import KMeans
import numpy as np
import pandas as pd
from sklearn import preprocessing

df = pd.read_csv("compdata.csv")
df.set_index('symbol', inplace=True)
del df['currency']
# df.dropna(inplace=True)

# le = preprocessing.LabelEncoder()
# df['country'] = le.fit_transform(df['country'])
# df['industry'] = le.fit_transform(df['industry'])
# df['subsector'] = le.fit_transform(df['subsector'])

df = df.iloc[:,4:]
df.dropna(inplace=True)
scaler = preprocessing.MinMaxScaler()
for col in df.columns:
    df[col] = scaler.fit_transform(df[col].values.reshape(-1,1))

kmeans = KMeans(n_clusters=3).fit(df.values)
df['risk_group'] = kmeans.predict(df.values)
risk_groups = df.groupby('risk_group')
print(risk_groups.mean())

if(25 < 30):
    print(risk_groups.get_group(0).head())
if(40 > 35):
    print(risk_groups.get_group(1).head())
if(40 > 40):
    print(risk_groups.get_group(2).head())