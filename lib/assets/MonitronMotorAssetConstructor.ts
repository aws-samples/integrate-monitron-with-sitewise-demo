// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as cdk from 'aws-cdk-lib';
import * as sitewise from 'aws-cdk-lib/aws-iotsitewise';
import { Construct } from 'constructs';

export interface MonitronMotorAssetProps {
    name: string       // Machine name
    assetModelId: string    // Model to follow
}

export class MonitronMotorAsset extends Construct{
    public readonly monitronAsset: sitewise.CfnAsset;
    public readonly ref: string;
    
    constructor(scope: Construct, id: string, props: MonitronMotorAssetProps) {
        super(scope, id);
        
        this.monitronAsset = new sitewise.CfnAsset(this, 'MonitronMotorAsset', {
            assetName: props.name,
            assetModelId: props.assetModelId
        });
        
        this.ref = this.monitronAsset.ref;
    }
}