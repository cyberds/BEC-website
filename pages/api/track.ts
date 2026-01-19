import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import geoip from 'geoip-lite';

const dataFilePath = path.join(process.cwd(), 'data', 'analytics.json');

interface AnalyticsData {
    totalVisits: number;
    sessions: Record<string, any>;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { sessionId, duration } = req.body;
        const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';
        const geo = geoip.lookup(ip);
        const country = geo ? geo.country : 'Unknown';

        try {
            let data: AnalyticsData = { totalVisits: 0, sessions: {} };
            if (fs.existsSync(dataFilePath)) {
                const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
                data = JSON.parse(fileContent);
            }

            const now = new Date().toISOString();

            if (!data.sessions) data.sessions = {};

            const sessionData = data.sessions[sessionId] || {
                startTime: now,
                country: country,
                duration: 0,
                lastPing: now
            };

            if (!data.sessions[sessionId]) {
                data.totalVisits += 1;
            }

            sessionData.duration = duration || 0;
            sessionData.lastPing = now;
            data.sessions[sessionId] = sessionData;

            fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

            return res.status(200).json({ success: true });
        } catch (error) {
            console.error('Analytics Error:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else if (req.method === 'GET') {
        try {
            if (fs.existsSync(dataFilePath)) {
                const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
                const data = JSON.parse(fileContent);
                return res.status(200).json(data);
            } else {
                return res.status(200).json({ totalVisits: 0, sessions: {} });
            }
        } catch (e) {
            return res.status(500).json({ message: 'Error reading stats' });
        }
    }

    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
