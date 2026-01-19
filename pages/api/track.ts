import type { NextApiRequest, NextApiResponse } from 'next';
import geoip from 'geoip-lite';
import clientPromise from '@/utils/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const client = await clientPromise;
    const db = client.db("bec_website");
    const collection = db.collection("analytics");

    if (req.method === 'POST') {
        const { sessionId, duration } = req.body;
        const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';
        const geo = geoip.lookup(ip);
        const country = geo ? geo.country : 'Unknown';
        const now = new Date().toISOString();

        try {
            // 1. Check if session exists
            const existingSession = await collection.findOne({ type: "session", sessionId });

            if (!existingSession) {
                // New session: increment total visits
                await collection.updateOne(
                    { type: "global_stats" },
                    { $inc: { totalVisits: 1 } },
                    { upsert: true }
                );

                // Create new session document
                await collection.insertOne({
                    type: "session",
                    sessionId,
                    startTime: now,
                    country,
                    duration: duration || 0,
                    lastPing: now
                });
            } else {
                // Update existing session
                await collection.updateOne(
                    { type: "session", sessionId },
                    {
                        $set: {
                            duration: duration || 0,
                            lastPing: now
                        }
                    }
                );
            }

            return res.status(200).json({ success: true });
        } catch (error) {
            console.error('Analytics Error:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else if (req.method === 'GET') {
        try {
            const stats = await collection.findOne({ type: "global_stats" });
            const totalVisits = stats ? stats.totalVisits : 0;

            const sessionCursor = collection.find({ type: "session" }).sort({ lastPing: -1 }).limit(100);
            const sessionsArray = await sessionCursor.toArray();

            // Format back to the object structure expected by the dashboard
            const sessions: Record<string, any> = {};
            sessionsArray.forEach(s => {
                sessions[s.sessionId] = {
                    startTime: s.startTime,
                    country: s.country,
                    duration: s.duration,
                    lastPing: s.lastPing
                };
            });

            return res.status(200).json({ totalVisits, sessions });
        } catch (e) {
            console.error("Fetch Error:", e);
            return res.status(500).json({ message: 'Error reading stats' });
        }
    }

    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
