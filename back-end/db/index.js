const MongoService = require('./mongo-service');
const SqliteService = require('./sqlite-service');

const dbType = process.env.DB_TYPE || 'mongo';

let dbInstance;

console.log(`Initializing Database with type: ${dbType}`);

if (dbType === 'sql') {
    dbInstance = new SqliteService();
} else {
    // Default to Mongo
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
        console.warn("Warning: MONGO_URL not set, but DB_TYPE is mongo (or default).");
    }
    dbInstance = new MongoService(mongoUrl);
}

module.exports = dbInstance;
