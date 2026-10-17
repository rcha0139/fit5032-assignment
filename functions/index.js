/**
 * Import function triggers from their respective submodules:
 */
const { onCall } = require("firebase-functions/v2/https");
const sgMail = require("@sendgrid/mail");

exports.ping = onCall((request) => {
    return { message: "Hello from Cloud Functions" };
});

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");


exports.sendEmail = onCall({ secrets: ["SENDGRID_KEY"] }, async (request) => {
    sgMail.setApiKey(process.env.SENDGRID_KEY);

    const msg = {
        to: request.data.to,
        from: "becachalmers@gmail.com",
        subject: request.data.subject,
        text: request.data.body,
        attachments: [{
            content: request.data.attachment,
            filename: request.data.filename,
            type: "text/csv",
            disposition: "attachment"
        }]
    };

    try {
        await sgMail.send(msg);
        return { success: true };
    } catch (error) {
        console.error("SendGrid error:", error.response?.body || error.message);
        throw new Error("Email failed to send");
    }
});

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
