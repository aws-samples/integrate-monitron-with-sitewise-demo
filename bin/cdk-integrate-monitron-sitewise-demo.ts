#!/usr/bin/env node
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as cdk from 'aws-cdk-lib';
import { CdkIntegrateMonitronSitewiseDemoStack } from '../lib/CdkIntegrateMonitronSitewiseDemoStack';

const app = new cdk.App();
new CdkIntegrateMonitronSitewiseDemoStack(app, 'CdkIntegrateMonitronSitewiseDemoStack');
