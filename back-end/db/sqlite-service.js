const sqlite3 = require('sqlite3').verbose();
const DatabaseInterface = require('./db-interface');
const path = require('path');

class SqliteService extends DatabaseInterface {
    constructor() {
        super();
        this.db = null;
    }

    async connect() {
        return new Promise((resolve, reject) => {
            const dbPath = path.resolve(__dirname, '../bec_local.sqlite');
            this.db = new sqlite3.Database(dbPath, (err) => {
                if (err) {
                    console.error("SQLite Connection Error:", err.message);
                    return resolve(false);
                }
                console.log("Connected to SQLite database.");
                this.initializeTables();
                resolve(true);
            });
        });
    }

    initializeTables() {
        const queries = [
            `CREATE TABLE IF NOT EXISTS global_stats (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                totalVisits INTEGER DEFAULT 0
            )`,
            `CREATE TABLE IF NOT EXISTS analytics_sessions (
                sessionId TEXT PRIMARY KEY,
                startTime TEXT,
                country TEXT,
                duration INTEGER,
                lastPing TEXT
            )`,
            `CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT,
                message TEXT,
                createdAt TEXT
            )`,
            `CREATE TABLE IF NOT EXISTS advert_submissions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT,
                targetLocation TEXT,
                advertText TEXT,
                numBoxes INTEGER,
                website TEXT,
                whatsapp TEXT,
                hasDesignFile BOOLEAN,
                designFileName TEXT,
                status TEXT,
                createdAt TEXT
            )`,
            `CREATE TABLE IF NOT EXISTS pricing_requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT,
                phone TEXT,
                status TEXT,
                createdAt TEXT
            )`,
            `INSERT OR IGNORE INTO global_stats (id, totalVisits) VALUES (1, 0)`
        ];

        this.db.serialize(() => {
            queries.forEach(query => {
                this.db.run(query, (err) => {
                    if (err) console.error("Table creation error:", err.message);
                });
            });
            // Migration for 'plan' column
            this.db.run("ALTER TABLE advert_submissions ADD COLUMN plan TEXT", (err) => {
                // Ignore error if column already exists
            });
        });
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) reject(err);
                else resolve(this);
            });
        });
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }

    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    // --- Implementation ---

    async trackSession(sessionId, country, duration) {
        const now = new Date().toISOString();
        try {
            const existing = await this.get("SELECT sessionId FROM analytics_sessions WHERE sessionId = ?", [sessionId]);

            if (!existing) {
                await this.run("UPDATE global_stats SET totalVisits = totalVisits + 1 WHERE id = 1");
                await this.run(
                    "INSERT INTO analytics_sessions (sessionId, startTime, country, duration, lastPing) VALUES (?, ?, ?, ?, ?)",
                    [sessionId, now, country, duration || 0, now]
                );
            } else {
                await this.run(
                    "UPDATE analytics_sessions SET duration = ?, lastPing = ? WHERE sessionId = ?",
                    [duration || 0, now, sessionId]
                );
            }
            return true;
        } catch (e) {
            console.error("SQLite Track Error:", e);
            throw e;
        }
    }

    async getAnalytics() {
        try {
            const stats = await this.get("SELECT totalVisits FROM global_stats WHERE id = 1");
            const sessionsArray = await this.all("SELECT * FROM analytics_sessions ORDER BY lastPing DESC LIMIT 100");

            const sessions = {};
            sessionsArray.forEach(s => {
                sessions[s.sessionId] = {
                    startTime: s.startTime,
                    country: s.country,
                    duration: s.duration,
                    lastPing: s.lastPing
                };
            });

            return { totalVisits: stats ? stats.totalVisits : 0, sessions };
        } catch (e) {
            console.error("SQLite Get Analytics Error:", e);
            throw e;
        }
    }

    async saveContact(contactData) {
        try {
            await this.run(
                "INSERT INTO contacts (name, email, message, createdAt) VALUES (?, ?, ?, ?)",
                [contactData.name, contactData.email, contactData.message, new Date().toISOString()]
            );
            return true;
        } catch (e) {
            console.error("SQLite Contact Error:", e);
            throw e;
        }
    }

    async saveAdvert(advertData) {
        try {
            // Convert array to string for storage if needed, though usually it comes as array from frontend
            const targetLocation = Array.isArray(advertData.targetLocation)
                ? JSON.stringify(advertData.targetLocation)
                : advertData.targetLocation;

            await this.run(
                `INSERT INTO advert_submissions 
                (name, email, targetLocation, advertText, numBoxes, website, whatsapp, hasDesignFile, designFileName, status, createdAt, plan) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    advertData.name,
                    advertData.email,
                    targetLocation,
                    advertData.advertText || null,
                    advertData.numBoxes,
                    advertData.website || null,
                    advertData.whatsapp,
                    advertData.hasDesignFile || false,
                    advertData.designFileName || null,
                    'pending',
                    new Date().toISOString(),
                    advertData.plan || 'Not Specified'
                ]
            );
            return true;
        } catch (e) {
            console.error("SQLite Advert Error:", e);
            throw e;
        }
    }

    async savePricingRequest(pricingData) {
        try {
            await this.run(
                "INSERT INTO pricing_requests (email, phone, status, createdAt) VALUES (?, ?, ?, ?)",
                [pricingData.email, pricingData.phone, 'pending', new Date().toISOString()]
            );
            return true;
        } catch (e) {
            console.error("SQLite Pricing Error:", e);
            throw e;
        }
    }
}

module.exports = SqliteService;
