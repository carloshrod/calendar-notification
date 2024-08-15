const twilio = require("twilio");
require("dotenv").config();

const accountSid = process.env.ACCOUNT_SID; // Account SID de Twilio
const authToken = process.env.AUTH_TOKEN; // Auth Token de Twilio

const wpClient = twilio(accountSid, authToken);

exports.wpClient = wpClient;
