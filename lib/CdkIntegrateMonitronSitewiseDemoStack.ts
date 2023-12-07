// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { MonitronModel } from './models/MonitronModelConstructor';
import { MonitronMotorAsset } from './assets/MonitronMotorAssetConstructor';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam'
import * as kinesis from 'aws-cdk-lib/aws-kinesis'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as lambdaEventSources from 'aws-cdk-lib/aws-lambda-event-sources'

export class CdkIntegrateMonitronSitewiseDemoStack extends Stack {
  public monitronModel: MonitronModel;
  public monitronAsset: MonitronMotorAsset;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    console.log("Test");

    //Create the Monitron Model on Sitewise
    this.monitronModel = new MonitronModel(this, 'MonitronModel', {});

    //Create a Asset called Monitron Motor based on the Monitron Model
    this.monitronAsset = new MonitronMotorAsset(this, 'MonitronMotorAsset1', 
      {
        name:'Monitron_Motor1', 
        assetModelId: this.monitronModel.ref
      });

    //Create a Kinesis Stream
    const stream = new kinesis.Stream(this, 'MonitronStream', {
      streamName: 'monitron-stream',
    });

    //Create a Lambda Role to access Kinesis, CloudWatch, and Sitewise
    const lambdaRole = new iam.Role(this, 'lambdaKinesisRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      description: 'iam-role-lambda-accessing-kinesis',
      inlinePolicies: {
        MapAssets: iam.PolicyDocument.fromJson({
            Statement: [
              {
                Effect: "Allow",
                Action: [
                  "logs:CreateLogGroup",
                  "logs:CreateLogStream",
                  "logs:PutLogEvents"],
                Resource: "arn:aws:logs:*:*:*"
              },
              {
                Effect: 'Allow',
                Action: [
                  "iotsitewise:Describe*",
                  "iotsitewise:List*",
                  "iotsitewise:Get*",
                  "iotsitewise:BatchPutAssetPropertyValue",
                  "iotsitewise:UpdateAssetProperty"
                ],
                Resource: '*'
              }
            ],
            Version: '2012-10-17'
        })
    }
    });
    stream.grantRead(lambdaRole);


    // environment Example: {
    //   'assetID': '9f232a1-4d7e-4233-b25f-15f68d7a43ad',
    //   'totalVibrationCrestID': '1f220f3d-8cba-4ccb-89f1-477a2b8bef45',
    //   'totalVibrationRmsID': '45b1a375-92c8-4efd-9d54-ee3c72881f28',
    //   'temperatureID': '2c269109-331d-4e4b-b26d-521a4b30bb0e'
    // }

    //Create a lambda Trigger
    const lambdaProcessEvent = new lambda.Function(this, 'monitron_message_handler', {
      runtime: lambda.Runtime.PYTHON_3_11,
      handler: 'ProcessMonitorEvent.lambda_handler',
      code: lambda.Code.fromAsset(__dirname + '/lambda'),
      functionName: 'MonitronMessageHandler',
      role:lambdaRole,
      environment: {
        'assetID': '<asset_ID>',
        'totalVibrationCrestID': '<asset_velocity_10To1000Hz_totalVibration_crestFactor_ID>',
        'totalVibrationRmsID': '<asset_velocity_10To1000Hz_totalVibration_rms_ID>',
        'temperatureID': '<asset_temperature_C_ID>'
      }
    });

    //Associate the Trigger with Kinesis
    const eventSource = new lambdaEventSources.KinesisEventSource(stream, {
      startingPosition: lambda.StartingPosition.TRIM_HORIZON,
      maxBatchingWindow: Duration.seconds(4)
    });
    lambdaProcessEvent.addEventSource(eventSource);
  }
}
