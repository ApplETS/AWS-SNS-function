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
      try {
        const client = new SNSClient({
          region: request.query.region,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
          },
        });
        const command = new CreatePlatformEndpointCommand({
          PlatformApplicationArn: process.env.AWS_PLATFORM_ARN,
          Token: request.query.token,
          CustomUserData: `ENS\\${request.query.universalCode}`,
        });
        response.send(await client.send(command));
      } catch (e) {
        logger.error(e.message);
        response.status(500).send(e.message);
      }
    });


exports.getEndpointAttributes = onRequest(
    async (request, response) => {
      logger.info("[getEndpointAttributes]", {structuredData: true});
      try {
        const client = new SNSClient({
          region: request.query.region,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
          },
        });
        const command = new GetEndpointAttributesCommand({
          EndpointArn: request.query.endpointArn,
        });
        response.send(await client.send(command));
      } catch (e) {
        logger.error(e.message);
        response.status(500).send(e.message);
      }
    });


exports.setEndpointAttributes = onRequest(
    async (request, response) => {
      logger.info("[setEndpointAttributes]", {structuredData: true});
      try {
        const client = new SNSClient({
          region: request.query.region,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
          },
        });
        const command = new SetEndpointAttributesCommand({
          EndpointArn: request.query.endpointArn,
          Attributes: {
            Token: request.query.token,
            Enabled: "true",
          },
          CustomUserData: `ENS\\${request.query.universalCode}`,
        });
        response.send(await client.send(command));
      } catch (e) {
        logger.error(e.message);
        response.status(500).send(e.message);
      }
    });
