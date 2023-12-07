#Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
#SPDX-License-Identifier: MIT-0

#Lambda Function Processing Monitron Events through Kinesis and Integrating them into Sitewise
#This code serves as a sample and does not include error handling. Its purpose is to simplify comprehension. 
#It should not be utilized as is in a production environment!!!!

import boto3
import json
import base64 
import uuid
import time
import os
from datetime import datetime

client_sw = boto3.client('iotsitewise')

#Convert string datetime to timestamp
def convertToTimestamp(date):
    datetime_object = datetime.strptime(date, '%Y-%m-%d %H:%M:%S.%f')
    timestamp = int(datetime.timestamp(datetime_object))
    return timestamp
    
#Put a new proprety double value
def sendDataToSitewise(timestamp, asset_id, property_id, value):
    entries=[
        {
            'entryId': str(uuid.uuid4()),
            'assetId': asset_id,
            'propertyId': property_id,
            'propertyValues': [
                {
                    'value': {
                        'doubleValue': value,
                    },
                    'timestamp': {
                        'timeInSeconds': timestamp,
                        'offsetInNanos': 0
                    },
                    'quality': 'GOOD'
                },
            ]
        }
    ]
    response = client_sw.batch_put_asset_property_value(entries = entries)
    return response

#Process Measurement event
#data schema:https://docs.aws.amazon.com/Monitron/latest/user-guide/data-export-schema-v2.html
def process_event_measurement(data):
    print('---- event measurement ---')
    timestamp_date = data['timestamp'] #'2023-11-16 17:06:10.695'
    print(timestamp_date)
    timestamp = convertToTimestamp(timestamp_date)
    
    payload = data['eventPayload']
    print(payload)
    
    #Id of the sensor that sent the data
    sensor_id = payload['sensor']['physicalId']
    print (sensor_id)
    
    features = payload['features']
    
    #get Velocity band10To1000Hz (mm/s)
    #example: {'totalVibration': {'absMax': 0.1102, 'absMin': 0.0, 'crestFactor': 3.2527, 'rms': 0.0339}, 'xAxis': {'rms': 0.0192}, 'yAxis': {'rms': 0.0144}, 'zAxis': {'rms': 0.024}}
    velocity_band10To1000Hz = features['velocity']['band10To1000Hz']
   
    #total vibration 
    total_vibration = velocity_band10To1000Hz['totalVibration']
    total_vibration_crest = total_vibration['crestFactor']
    total_vibration_rms = total_vibration['rms'] #mm/s
    
    #temperature oC
    temperature = features['temperature'] #oC

    #Test
    # print (f'timestamp: {timestamp}')
    # print (f'crest {total_vibration_crest}')
    # print (f'rms {total_vibration_rms} mm/s')
    # print (f'Temperature: {temperature} oC ')

    #Get Asset and Properties IDs from Environment Variables
    asset_id = os.environ['assetID']
    total_vibration_crest_id = os.environ['totalVibrationCrestID']
    total_vibration_rms_id = os.environ['totalVibrationRmsID']
    temperature_id = os.environ['temperatureID']

    #Send data to Sitewise
    #It can be expanded for more properties
    print(sendDataToSitewise(timestamp, asset_id, total_vibration_crest_id, total_vibration_crest))
    print(sendDataToSitewise(timestamp, asset_id, total_vibration_rms_id, total_vibration_rms))
    print(sendDataToSitewise(timestamp, asset_id, temperature_id, temperature))


#Main Handler
def lambda_handler(event, context):
    print ('--- Event ----')
    print (f'Event: {event}')
    
    records = event['Records']
    for item in records:
        #get data from event
        data_b64 = item['kinesis']['data']
        #decode base64
        data_string = base64.b64decode(data_b64.encode("ascii")).decode("ascii")
        #converg string into Json
        data = json.loads(data_string)
        print(data)
        if data['eventType'] == 'measurement':
            process_event_measurement(data);
        
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
