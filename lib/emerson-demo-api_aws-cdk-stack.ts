import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ssm_service from './ssm-service';
import * as api_gateway_service from './api-gateway-service';

export class EmersonDemoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new ssm_service.SsmService(this, 'SSM-Params');

  }
}
