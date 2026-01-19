const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const apiCall = async (endpoint: string, method: 'GET' | 'POST' = 'GET', data?: any) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : undefined,
        });

        if (!response.ok) {
            throw new Error(`API call failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const sendContactMessage = (data: { name: string, email: string, message: string }) =>
    apiCall('/api/contact', 'POST', data);

export const trackVisit = (data: { sessionId: string, duration?: number }) =>
    apiCall('/api/track', 'POST', data);

export const getAnalyticsStats = () =>
    apiCall('/api/analytics', 'GET');
