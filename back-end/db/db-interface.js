class DatabaseInterface {
    async connect() { throw new Error("Method not implemented"); }

    // Analytics
    async trackSession(sessionId, ip, duration) { throw new Error("Method not implemented"); }
    async getAnalytics() { throw new Error("Method not implemented"); }

    // Forms
    async saveContact(contactData) { throw new Error("Method not implemented"); }
    async saveAdvert(advertData) { throw new Error("Method not implemented"); }
    async savePricingRequest(pricingData) { throw new Error("Method not implemented"); }
}

module.exports = DatabaseInterface;
