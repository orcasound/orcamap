# orcaSoundViz

Project to create/maintain a map based interface for visualizing reports 
of Southern Resident Orcas in the Salish Sea (WA state and BC)

## Database

The database of Orca locations will be located in an InfluxDB timeseries DB.

https://docs.influxdata.com/influxdb/v1.1/introduction/getting_started/

Likely going to install it on a docker instance and then populate first with 
test (fake) data and then with actual data from the existing orcaNet database.

## Map

Basic functionality to include:

1. Dots where orca have been seen most recently, color coded for timeliness?
2. Capacity to add a 'sighting' by choosing your current location and dragging
   an arrow in the direction of pod movement
3. Optionally provide "fisherwhale" vs. "transient" classification
4. optionally provide for upload of a photograph
5. initially be password protected, but eventually having login/auth governed
   by either the phone app or google login (or openauth equiv)

## History

Ideally provide a capability for looking at whale patterns through time

1. aggregated by month?
2. full time slider?


