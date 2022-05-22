import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from "aws-cdk-lib/aws-apigateway";

import { NestLambdaService1 } from './nest-lambda-service-1';

export class ApiGatewayService extends Construct{

    constructor(scope: Construct, id: string) {
        super(scope, id);


        const nodeLayer = new lambda.LayerVersion(this, 'node-layer', {
            compatibleRuntimes: [
                lambda.Runtime.NODEJS_14_X,
                lambda.Runtime.NODEJS_12_X
            ],
            code: lambda.Code.fromAsset('layers/nodejs/node_modules')
          });
    
    const api = new apigateway.RestApi(this, "emerson-api", {
        restApiName: "Thermostat API",
        description: "This API serves Thermostat Info."
      });

     const world = api.root.addResource('world');
     const worldService = new NestLambdaService1(this, 'world-handler');
      const getWorldIntegration = new apigateway.LambdaIntegration( worldService.handler, {
        requestTemplates: { "application/json": '{ "statusCode": "200" }' }
      });
      world.addMethod("GET", getWorldIntegration); // GET /

      const earth = api.root.addResource('earth');
      const earthService = new NestLambdaService1(this, 'earth-handler');
       const getEarthIntegration = new apigateway.LambdaIntegration( earthService.handler, {
         requestTemplates: { "application/json": '{ "statusCode": "200" }' }
       });
       earth.addMethod("GET", getEarthIntegration); // GET /
 
 
       
     
      
    

    
    }
}