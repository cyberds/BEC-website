const { MongoClient } = require('mongodb');
const DatabaseInterface = require('./db-interface');

class MongoService extends DatabaseInterface {
    constructor(uri) {
        super();
        this.client = new MongoClient(uri);
        this.db = null;
    }

    async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db("bec_website");
            console.log("Connected to MongoDB via Service");
            return true;
        } catch (e) {
            console.error("MongoDB Connection Error:", e);
            return false;
        }
    }

    async trackSession(sessionId, country, duration) {
        if (!this.db) return;
        const now = new Date().toISOString();
        const collection = this.db.collection("analytics");

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
        return true;
    }

    async getAnalytics() {
        if (!this.db) return { totalVisits: 0, sessions: {} };
        const collection = this.db.collection("analytics");

        const stats = await collection.findOne({ type: "global_stats" });
        const sessionsArray = await collection.find({ type: "session" }).sort({ lastPing: -1 }).limit(100).toArray();

        const sessions = {};
        sessionsArray.forEach(s => {
            sessions[s.sessionId] = {
                startTime: s.startTime, country: s.country, duration: s.duration, lastPing: s.lastPing
            };
        });

        return { totalVisits: stats ? stats.totalVisits : 0, sessions };
    }

    async saveContact(contactData) {
        if (!this.db) throw new Error("DB not connected");
        const collection = this.db.collection("contacts");
        await collection.insertOne({ ...contactData, createdAt: new Date() });
        return true;
    }

    async saveAdvert(advertData) {
        if (!this.db) throw new Error("DB not connected");
        const collection = this.db.collection("advert_submissions");
        await collection.insertOne({ ...advertData, status: 'pending', createdAt: new Date() });
        return true;
    }

    async savePricingRequest(pricingData) {
        if (!this.db) throw new Error("DB not connected");
        const collection = this.db.collection("pricing_requests");
        await collection.insertOne({ ...pricingData, status: 'pending', createdAt: new Date() });
        return true;
    }
}

module.exports = MongoService;
