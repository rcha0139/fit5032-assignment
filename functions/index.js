/**
 * Import function triggers from their respective submodules:
 */
const { onCall } = require("firebase-functions/v2/https");
const nodemailer = require("nodemailer");

exports.ping = onCall((request) => {
    return { message: "Hello from Cloud Functions" };
});

const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendEmail = onCall({ secrets: ["GMAIL_PASSWORD"] }, async (request) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "becachalmers@gmail.com",
            pass: process.env.GMAIL_PASSWORD
        }
    });

    try {
        await transporter.sendMail({
            from: "becachalmers@gmail.com",
            to: request.data.to,
            subject: request.data.subject,
            text: request.data.body,
            attachments: [{
                filename: request.data.filename,
                content: request.data.attachment,
                encoding: "base64"
            }]
        });
        return { success: true };
    } catch (error) {
        console.error("Email error:", error.message);
        throw new Error("Email failed to send");
    }
});

exports.apiEvents = onRequest({ cors: true }, async (req, res) => {
    const snap = await admin.firestore().collection('events').get();
    const events = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    res.json({ count: events.length, events });
});

exports.apiReefSites = onRequest({ cors: true }, async (req, res) => {
    const snap = await admin.firestore().collection('reefsites').get();
    const sites = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    res.json({ count: sites.length, sites });
});
