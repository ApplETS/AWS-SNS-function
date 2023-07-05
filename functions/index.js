/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const {
  SNSClient,
  CreatePlatformEndpointCommand,
  GetEndpointAttributesCommand,
  SetEndpointAttributesCommand,
} = require("@aws-sdk/client-sns");


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.createPlatformEndpoint = onRequest(
    async (request, response) => {
      logger.info("[createPlatformEndpoint]", {structuredData: true});
      const region = request.query.region;
      const token = request.query.token;
      const client = new SNSClient({region: region, credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY}});
      const command = new CreatePlatformEndpointCommand({
        PlatformApplicationArn: process.env.AWS_PLATFORM_ARN,
        Token: token,
      });
      response.send(await client.send(command));
    });


exports.getEndpointAttributes = onRequest(
    async (request, response) => {
      logger.info("[getEndpointAttributes]", {structuredData: true});

      const region = request.query.region;
      const endpointArn = request.query.endpointArn;
      const client = new SNSClient({region: region, credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY}});
      const command = new GetEndpointAttributesCommand({
        EndpointArn: endpointArn,
      });
      response.send(await client.send(command));
    });


exports.setEndpointAttributes = onRequest(
    async (request, response) => {
      logger.info("[setEndpointAttributes]", {structuredData: true});

      const region = request.query.region;
      const endpointArn = request.query.endpointArn;
      const client = new SNSClient({region: region, credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY}});

      const command = new SetEndpointAttributesCommand({
        EndpointArn: endpointArn,
        Attributes: {
          Token: request.query.token,
          Enabled: "true",
        },
      });
      response.send(await client.send(command));
    });
