import { useEffect, useState } from 'react';
import Head from 'next/head';
import { getAnalyticsStats } from '@/utils/api';
import { formatDate } from '@/utils/helpers';
import dynamic from 'next/dynamic';

type SessionData = {
    startTime: string;
    country: string;
    duration: number;
    lastPing: string;
};

type AnalyticsData = {
    totalVisits: number;
    sessions: Record<string, SessionData>;
};

function AnalyticsDashboard() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAnalyticsStats()
            .then(stats => {
                setData(stats);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-10 text-white">Loading stats...</div>;
    if (!data) return <div className="p-10 text-white">Error loading stats</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <Head>
                <title>BEC Analytics</title>
            </Head>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-accent">Visitor Analytics</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <h3 className="text-gray-400 text-sm">Total Visits</h3>
                        <p className="text-4xl font-bold mt-2">{data.totalVisits}</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <h3 className="text-gray-400 text-sm">Active Sessions (approx)</h3>
                        <p className="text-4xl font-bold mt-2">
                            {Object.values(data.sessions).filter(s => {
                                const lastPing = new Date(s.lastPing).getTime();
                                return (Date.now() - lastPing) < 60000; // Active within last minute
                            }).length}
                        </p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <h3 className="text-gray-400 text-sm">Countries Reached</h3>
                        <p className="text-4xl font-bold mt-2">
                            {new Set(Object.values(data.sessions).map(s => s.country)).size}
                        </p>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-700">
                        <h3 className="font-semibold">Recent Sessions</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-750 text-gray-400 uppercase bg-gray-900">
                                <tr>
                                    <th className="px-6 py-3">Start Time</th>
                                    <th className="px-6 py-3">Country</th>
                                    <th className="px-6 py-3">Duration (s)</th>
                                    <th className="px-6 py-3">Last Ping</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {Object.entries(data.sessions)
                                    .sort((a, b) => new Date(b[1].startTime).getTime() - new Date(a[1].startTime).getTime())
                                    .slice(0, 50) // Show last 50
                                    .map(([sessionId, session]) => (
                                        <tr key={sessionId} className="hover:bg-gray-700/50">
                                            <td className="px-6 py-4">{new Date(session.startTime).toLocaleString()}</td>
                                            <td className="px-6 py-4">{session.country}</td>
                                            <td className="px-6 py-4">{session.duration}s</td>
                                            <td className="px-6 py-4">{new Date(session.lastPing).toLocaleTimeString()}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
