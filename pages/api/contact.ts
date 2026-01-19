import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/utils/db';

type Data = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        // Validate inputs
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Missing fields' });
        }

        // Checking for valid email format (simple regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }

        try {
            const client = await clientPromise;
            const db = client.db("bec_website");
            const collection = db.collection("contacts");

            await collection.insertOne({
                name,
                email,
                message,
                createdAt: new Date()
            });

            console.log('Contact Form Saved to DB:', { name, email, message });
            return res.status(200).json({ message: 'Message sent successfully' });
        } catch (error) {
            console.error('Contact error:', error);
            return res.status(500).json({ message: 'Error saving message' });
        }
    }

    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
