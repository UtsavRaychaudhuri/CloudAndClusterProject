Query 1
Count all the data where speed is greater than 100
db.data.find({‘speed’:{$gt:100}}).count()

Query 2
Volume: Find the total volume for the station Foster NB for Sept 21, 2011.
db.data.aggregate([{$match:{"convertedDate":{$gte:new Date("2011-09-21"),$lte:new Date("2011-09-22")},"station_name":"Foster NB"}},{$group:{_id:null,totalVolume:{$sum:"$volume"}}}])

Query 3
Single-Day Station Travel Times: Find travel time for station Foster NB for 5-minute intervals for Sept 22, 2011. Report travel time in seconds.
db.new_data.aggregate([{$match:{station_name:"Foster NB"}},{ "$group": {"_id": {"$subtract": [{ "$subtract": [ "$convertedDate", new Date(
"2011-09-22") ] },{ "$mod": [ { "$subtract": [ "$convertedDate", new Date("2011-09-23") ] },1000 * 60 * 5]}]},"averageSpeed": { $avg: "$speed" }}},{"$project":{"traveltime":{$multiply:[3600,{$divide:[9.4,"$averageSpeed"]}]}}}])

Query 4
Peak Period Travel Times: Find the average travel time for 7-9AM and 4-6PM on September 22, 2011 for station Foster NB. Report travel time in seconds.
Travel Time from 7-9 AM
db.data.aggregate([{$match:{"convertedDate":{$gte:new Date("2011-09-22T07:00:00Z"),$lte:new Date("2011-09-22T09:00:00Z")},"station_name":"Foster NB"}},{$group:{_id:null,averageSpeed:{$avg:"$speed"}}},{"$project":{"traveltime":{$multiply:[3600,{$divide:[9.4,"$averageSpeed"]}]}}}])

Travel Time from 4-6 PM
db.data.aggregate([{$match:{"convertedDate":{$gte:new Date("2011-09-22T16:00:00Z"),$lte:new Date("2011-09-22T18:00:00Z")},"station_name":"Foster NB"}},{$group:{_id:null,averageSpeed:{$avg:"$speed"}}},{"$project":{"traveltime":{$multiply:[3600,{$divide:[9.4,"$averageSpeed"]}]}}}])
