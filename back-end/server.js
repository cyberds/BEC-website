const express = require('express');
const { MongoClient } = require('mongodb');
const geoip = require('geoip-lite');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db("bec_website");
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error("DB Connection Error:", e);
    }
}
connectDB();

// Analytics Track Endpoint
app.post('/api/track', async (req, res) => {
    const { sessionId, duration } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const geo = geoip.lookup(ip);
    const country = geo ? geo.country : 'Unknown';
    const now = new Date().toISOString();

    try {
        const collection = db.collection("analytics");
        const existingSession = await collection.findOne({ type: "session", sessionId });

        if (!existingSession) {
            await collection.updateOne(
                { type: "global_stats" },
                { $inc: { totalVisits: 1 } },
                { upsert: true }
            );

            await collection.insertOne({
                type: "session", sessionId, startTime: now, country, duration: duration || 0, lastPing: now
            });
        } else {
            await collection.updateOne(
                { type: "session", sessionId },
                { $set: { duration: duration || 0, lastPing: now } }
            );
        }
        res.status(200).json({ success: true });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Analytics Get Stats Endpoint
app.get('/api/analytics', async (req, res) => {
    try {
        const collection = db.collection("analytics");
        const stats = await collection.findOne({ type: "global_stats" });
        const sessionsArray = await collection.find({ type: "session" }).sort({ lastPing: -1 }).limit(100).toArray();

        const sessions = {};
        sessionsArray.forEach(s => {
            sessions[s.sessionId] = {
                startTime: s.startTime, country: s.country, duration: s.duration, lastPing: s.lastPing
            };
        });
        res.status(200).json({ totalVisits: stats ? stats.totalVisits : 0, sessions });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Contact Endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const collection = db.collection("contacts");
        await collection.insertOne({ name, email, message, createdAt: new Date() });
        res.status(200).json({ message: 'Message saved successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});
