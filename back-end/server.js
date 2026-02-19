const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Database Service (Factory)
const db = require('./db');

app.use(cors());
app.use(express.json());

// Cloudinary Config
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Temporary storage before upload

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Connect to Database
async function startServer() {
    await db.connect();

    app.listen(port, () => {
        console.log(`Backend listening at http://localhost:${port}`);
    });
}

// Health Check Endpoint
app.get('/api/health', async (req, res) => {
    // Basic check, ideally utilize an isConnected method
    res.status(200).json({
        status: "OK",
        database: "Connected", // Simplified for now
        timestamp: new Date().toISOString()
    });
});

// Analytics Track Endpoint
app.post('/api/track', async (req, res) => {
    const { sessionId, duration } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

    // GeoIP lookup can be moved to service or kept here. Keeping here for now as it's logic not data persistence.
    // However, sqlite service might store country directly. 
    // Let's use the geoip-lite here as before.
    const geoip = require('geoip-lite');
    const geo = geoip.lookup(ip);
    const country = geo ? geo.country : 'Unknown';

    try {
        await db.trackSession(sessionId, country, duration);
        res.status(200).json({ success: true });
    } catch (e) {
        console.error("Track Error:", e);
        res.status(500).json({ error: e.message });
    }
});

// Analytics Get Stats Endpoint
app.get('/api/analytics', async (req, res) => {
    try {
        const analyticsData = await db.getAnalytics();
        res.status(200).json(analyticsData);
    } catch (e) {
        console.error("Analytics Error:", e);
        res.status(500).json({ error: e.message });
    }
});

// Contact Endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        await db.saveContact({ name, email, message });
        res.status(200).json({ message: 'Message saved successfully' });
    } catch (e) {
        console.error("Contact Error:", e);
        res.status(500).json({ error: e.message });
    }
});

// Advert Submission Endpoint (Artzy Box)
app.post('/api/advert-submission', async (req, res) => {
    // Pass everything to service
    try {
        await db.saveAdvert(req.body);
        res.status(200).json({ message: 'Advert submission saved successfully' });
    } catch (e) {
        console.error("Advert Error:", e);
        res.status(500).json({ error: e.message });
    }
});

// Pricing Request Endpoint (Artzy Box)
app.post('/api/pricing-request', async (req, res) => {
    try {
        await db.savePricingRequest(req.body);
        res.status(200).json({ message: 'Pricing request saved successfully' });
    } catch (e) {
        console.error("Pricing Error:", e);
        res.status(500).json({ error: e.message });
    }
});

// Cloudinary Upload Endpoint
app.post('/api/upload', upload.array('files'), async (req, res) => {
    try {
        console.log('Upload Request Received');
        const files = req.files;
        if (!files || files.length === 0) {
            console.log('No files found in request');
            return res.status(400).json({ error: 'No files uploaded' });
        }
        console.log(`Processing ${files.length} file(s)...`);

        const uploadPromises = files.map(file => {
            console.log(`Uploading file: ${file.path}`);
            return cloudinary.uploader.upload(file.path, {
                folder: 'bec_adverts',
                resource_type: 'auto'
            });
        });

        const results = await Promise.all(uploadPromises);
        const fileUrls = results.map(result => result.secure_url);
        console.log('Upload successful. URLs:', fileUrls);

        res.status(200).json({ urls: fileUrls });
    } catch (e) {
        console.error("Cloudinary Upload Error Details:", e);
        res.status(500).json({ error: 'Failed to upload files' });
    }
});

// Start the server
startServer();
