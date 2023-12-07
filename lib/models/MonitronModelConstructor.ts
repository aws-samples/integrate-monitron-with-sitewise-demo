// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

//This model represent the AWS Monitron Model without Alerts
//It also add an extra Transformation to represent the temperature in Fahrenheit 
import * as cdk from 'aws-cdk-lib';
import * as sitewise from 'aws-cdk-lib/aws-iotsitewise';
import { Construct } from 'constructs';

export interface MonitronModelProp {
}

//Create the Monitron Model via a CDK Construct
//data schema:https://docs.aws.amazon.com/Monitron/latest/user-guide/data-export-schema-v2.html
//it is based on the model in Nov 27 - 2023

export class MonitronModel extends Construct {
    private monitronModel: sitewise.CfnAssetModel;
    public readonly ref: string;

    
    // Create the Monitron Model
    constructor(scope: Construct, id: string, props: MonitronModelProp) {
        super(scope, id);
        
        this.monitronModel = new sitewise.CfnAssetModel(this, 'MonitronModel', {
            assetModelName: 'Amazon_Monitron',
            assetModelDescription: 'Amazon Monitron - Enable predictive maintenance for industrial equipment with Machine Learning',
            assetModelProperties: [
                // ATTRIBUTES
                {
                    name: 'name',
                    dataType: 'STRING',
                    logicalId: 'sensorNameAttribute',
                    type: {
                        typeName: 'Attribute',
                        attribute: { defaultValue: ' '} 
                    }
                }, 
                {
                    name: 'physicalId',
                    dataType: 'STRING',
                    logicalId: 'physicalIdAttribute',
                    type: {
                        typeName: 'Attribute',
                        attribute: { defaultValue: ' '} 
                    }
                },
                // MEASUREMENTS
              { 
                name: 'rssi',
                dataType: 'DOUBLE',
                logicalId: 'rssSensorToGatewayMeasurement',
                type: { typeName: 'Measurement' }
              },
              { 
                name: 'temperature_C',
                dataType: 'DOUBLE',
                logicalId: 'temperature_C_Measurement',
                unit: 'C',
                type: { typeName: 'Measurement' }
              },
              { 
                name: 'acceleration_0To6000Hz_xAxis_rms',
                dataType: 'DOUBLE',
                logicalId: 'acceleration_0To6000Hz_xAxisMeasurement',
                unit: 'm/sˆ2',
                type: { typeName: 'Measurement' }
              },
              { 
                name: 'acceleration_0To6000Hz_yAxis_rms',
                dataType: 'DOUBLE',
                logicalId: 'acceleration_0To6000Hz_yAxisMeasurement',
                unit: 'm/sˆ2',
                type: { typeName: 'Measurement' }
              },
              { 
                name: 'acceleration_0To6000Hz_zAxis_rms',
                dataType: 'DOUBLE',
                logicalId: 'acceleration_0To6000Hz_zAxisMeasurement',
                unit: 'm/sˆ2',
                type: { typeName: 'Measurement' }
              },
              { 
                name: 'acceleration_10To1000Hz_xAxis_rms',
                dataType: 'DOUBLE',
                logicalId: 'acceleration_10To1000Hz_xAxisMeasurement',
                unit: 'm/sˆ2',
                type: { typeName: 'Measurement' }
              },
              { 
                name: 'acceleration_10To1000Hz_yAxis_rms',
                dataType: 'DOUBLE',
                logicalId: 'acceleration_10To1000Hz_yAxisMeasurement',
                unit: 'm/sˆ2',
                type: { typeName: 'Measurement' }
              },
              { 
                name: 'acceleration_10To1000Hz_zAxis_rms',
                dataType: 'DOUBLE',
                logicalId: 'acceleration_10To1000Hz_zAxisMeasurement',
                unit: 'm/sˆ2',
                type: { typeName: 'Measurement' }
              },
              { 
                name: 'acceleration_10To1000Hz_totalVibration_rms',
                dataType: 'DOUBLE',
                logicalId: 'acceleration_10To1000Hz_totalVibrationMeasurement',
                unit: 'm/sˆ2',
                type: { typeName: 'Measurement' }
              },
              { 
                name: 'acceleration_10To1000Hz_totalVibration_absmax',
                dataType: 'DOUBLE',
                logicalId: 'acceleration_10To1000Hz_totalVibration_absmaxMeasurement',
                unit: 'm/sˆ2',
                type: { typeName: 'Measurement' }
              },
              { 
                name: 'acceleration_10To1000Hz_totalVibration_absMin',
                dataType: 'DOUBLE',
                logicalId: 'acceleration_10To1000Hz_totalVibration_absMinMeasurement',
                unit: 'm/sˆ2',
                type: { typeName: 'Measurement' }
              },
              { 
                name: 'acceleration_10To1000Hz_totalVibration_crestFactor',
                dataType: 'DOUBLE',
                logicalId: 'acceleration_10To1000Hz_totalVibration_crestFactorMeasurement',
                type: { typeName: 'Measurement' }
              },
              { 
                name: 'velocity_10To1000Hz_totalVibration_rms',
                dataType: 'DOUBLE',
                logicalId: 'velocity_10To1000Hz_totalVibrationMeasurement',
                unit: 'mm/s',
                type: { typeName: 'Measurement' }
              },
              { 
                name: 'velocity_10To1000Hz_totalVibration_absmax',
                dataType: 'DOUBLE',
                logicalId: 'velocity_10To1000Hz_totalVibration_absmaxMeasurement',
                unit: 'mm/s',
                type: { typeName: 'Measurement' }
              },
              { 
                name: 'velocity_10To1000Hz_totalVibration_absMin',
                dataType: 'DOUBLE',
                logicalId: 'velocity_10To1000Hz_totalVibration_absMinMeasurement',
                unit: 'mm/s',
                type: { typeName: 'Measurement' }
              },
              { 
                name: 'velocity_10To1000Hz_totalVibration_crestFactor',
                dataType: 'DOUBLE',
                logicalId: 'velocity_10To1000Hz_totalVibration_crestFactorMeasurement',
                type: { typeName: 'Measurement' }
              },
              { 
                name: 'velocity_10To1000Hz_xAxis_rms',
                dataType: 'DOUBLE',
                logicalId: 'velocity_10To1000Hz_xAxisMeasurement',
                unit: 'mm/s',
                type: { typeName: 'Measurement' }
              },
              { 
                name: 'velocity_10To1000Hz_yAxis_rms',
                dataType: 'DOUBLE',
                logicalId: 'velocity_10To1000Hz_yAxisMeasurement',
                unit: 'mm/s',
                type: { typeName: 'Measurement' }
              },
              { 
                name: 'velocity_10To1000Hz_zAxis_rms',
                dataType: 'DOUBLE',
                logicalId: 'velocity_10To1000Hz_zAxisMeasurement',
                unit: 'mm/s',
                type: { typeName: 'Measurement' }
              },
              // TRANSFORMS
              { 
                name: 'temperature_F',
                dataType: 'DOUBLE',
                logicalId: 'temperature_F_Measurement',
                unit: 'F',
                type: { 
                  typeName: 'Transform', 
                  transform: {
                    expression: '(temp * 9/5) + 32',
                    variables: [
                      {
                        name: 'temp',
                        value: { propertyLogicalId: 'temperature_C_Measurement' }
                      }
                    ]
                  }
                }
              },
            ]
        });


        // Print the Ids
        new cdk.CfnOutput(this, 'Amazon Monitron Model Id', {
            value: this.monitronModel.ref,
            description: 'LogicalID of the Amazon Monitron model.'
        });

        // Set the ref variable
        this.ref = this.monitronModel.ref;
    }
}