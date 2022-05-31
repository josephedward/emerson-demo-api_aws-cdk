import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
// import * as gateway from 'aws-cdk-lib/aws-apigateway';

export class NestLambdaService1 extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  nodeLayer = new lambda.LayerVersion(this, "node-layer", {
    compatibleRuntimes: [
      lambda.Runtime.NODEJS_14_X,
      lambda.Runtime.NODEJS_12_X,
    ],
    code: lambda.Code.fromAsset("layers/nodejs/node_modules"),
  });

  handler = new lambda.Function(this, "handler-1", {
    runtime: lambda.Runtime.NODEJS_14_X, // So we can use async in widget.js
    code: lambda.Code.fromAsset("api/nest-lambda-1/dist"),
    handler: "main.api",
    layers: [this.nodeLayer],
    environment: {
      NODE_PATH: "$NODE_PATH:/opt",
    }  
  });
}
