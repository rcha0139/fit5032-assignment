/**
 * Cloud Functions for Restore the Reef.
 */
const { onCall, onRequest, HttpsError } = require("firebase-functions/v2/https");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");

admin.initializeApp();

exports.ping = onCall((request) => {
    return { message: "Hello from Cloud Functions" };
});

// Sends mail server-side so the Gmail credential stays in Secret Manager
// and is never shipped to the browser.
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

// Public REST endpoints so third parties can fetch the data
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

// Dashboard metrics aggregated server-side. The client never downloads the
// user documents just to count them, and the admin check happens here
// rather than being trusted from the browser.
exports.getDashboardStats = onCall(async (request) => {
    if (!request.auth) {
        throw new HttpsError('unauthenticated', 'Sign in required');
    }

    const db = admin.firestore();

    const profile = await db.collection('users').doc(request.auth.uid).get();
    if (profile.data()?.role !== 'admin') {
        throw new HttpsError('permission-denied', 'Admins only');
    }

    const [users, volunteers, admins, events] = await Promise.all([
        db.collection('users').count().get(),
        db.collection('users').where('role', '==', 'volunteer').count().get(),
        db.collection('users').where('role', '==', 'admin').count().get(),
        db.collection('events').count().get()
    ]);

    return {
        users: users.data().count,
        volunteers: volunteers.data().count,
        admins: admins.data().count,
        events: events.data().count
    };
});