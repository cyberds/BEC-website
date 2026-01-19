import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { trackVisit } from '@/utils/api';

export const useAnalytics = () => {
    const sessionIdRef = useRef<string | null>(null);
    const startTimeRef = useRef<number>(Date.now());

    useEffect(() => {
        // Initialize session ID
        let storedSessionId = localStorage.getItem('bec_session_id');
        if (!storedSessionId) {
            storedSessionId = uuidv4();
            localStorage.setItem('bec_session_id', storedSessionId);
        }
        sessionIdRef.current = storedSessionId;

        const sendPing = () => {
            if (!sessionIdRef.current) return;

            const duration = (Date.now() - startTimeRef.current) / 1000; // in seconds

            trackVisit({
                sessionId: sessionIdRef.current,
                duration: Math.floor(duration),
            }).catch(err => console.error('Analytics ping failed', err));
        };

        // Initial ping
        sendPing();

        // Ping every 10 seconds
        const interval = setInterval(sendPing, 10000);

        return () => clearInterval(interval);
    }, []);
};
