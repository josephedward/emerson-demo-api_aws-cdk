import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ssm from 'aws-cdk-lib/aws-ssm';




export class SsmService extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        const emailParam = new ssm.StringParameter(this, 'alerts-email-param', {
            parameterName: '/my-site/alerts-email-dev',
            stringValue: 'dev-email@example.com',
            description: 'the email used for alerting for dev',
            type: ssm.ParameterType.STRING,
            tier: ssm.ParameterTier.STANDARD,
            allowedPattern: '.*',
          });
      
          const environmentsParam = new ssm.StringListParameter(
            this,
            'environments-param',
            {
              parameterName: '/my-site/environments',
              stringListValue: ['dev', 'test', 'prod'],
              tier: ssm.ParameterTier.ADVANCED,
            },
          );
      
          const importedParam =
            ssm.StringParameter.fromSecureStringParameterAttributes(
              this,
              'imported-param-3',
              {parameterName: '/my-app/dev/db-password', version: 1},
            );
      
          new cdk.CfnOutput(this, 'imported-param-3-value', {
            value: importedParam.parameterName,
          });
        
    }
}