import pandas as pd
import matplotlib as mp
from matplotlib import pyplot as plt
import geohash2


spot_csv_columnnames = ['date',\
   'id',\
   'status',\
   'lat',\
   'lon',\
   'c1',\
   'c2']

br_df = pd.read_csv('120416-120507.csv', names=spot_csv_columnnames)

br_track = [];
for date, tracker_id, status, lat, lon, c1, c1 \
  in zip(br_df['date'],br_df['id'],br_df['lat'],br_df['lon'], \
         br_df['c1'],br_df['c2']):
  point_feature_string = """
    [
        {
            "type": "Feature",
            "properties": {
                "id": ,
                "cmt": %s,
                "status": %s,
                "date": %s,

        }
    ]
    """ % (tracker_id, c2,status,date)
    print(point_feature_string)
