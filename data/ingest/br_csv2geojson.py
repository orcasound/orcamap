import pandas as pd
import geohash2
import geojson as gj

spot_csv_columnnames = ['date',
                        'id',
                        'status',
                        'lat',
                        'lon',
                        'c1',
                        'c2']

br_df = pd.read_csv('120416-120507.csv', names=spot_csv_columnnames)
testFeatCollection = gj.FeatureCollection([])
for name, row in br_df.iloc[:].iterrows():
    #print(row['date'], row['id'], row['lat'],row['lon'], geohash2.encode(row['lat'],row['lon']))
    feat_props = { 'geohash': geohash2.encode(row['lat'],row['lon']), 
                   'id': row['id'],
                   'status': row['status'],
                   'date': row['date'] }
    if isinstance(row['c1'],str):
        feat_props['c1'] = row['c1']
    if isinstance(row['c2'],str):
        feat_props['c2'] = row['c2']
    feat_geom = gj.Point((row['lon'],row['lat']))
    rowFeature = gj.Feature(geometry=feat_geom)
    rowFeature.properties = feat_props
    testFeatCollection.features.append(rowFeature)

FILE = open('track.geojson','w')
FILE.write(gj.dumps(testFeatCollection))
FILE.close()

