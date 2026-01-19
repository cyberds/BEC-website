/**
 * Centralized API utility for BEC website
 */

export const apiCall = async (endpoint: string, method: 'GET' | 'POST' = 'GET', data?: any) => {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (data && method === 'POST') {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(endpoint, options);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API call failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error);
        throw error;
    }
};

// Specific endpoints
export const sendContactMessage = (data: { name: string, email: string, message: string }) =>
    apiCall('/api/contact', 'POST', data);

export const trackVisit = (data: { sessionId: string, duration: number }) =>
    apiCall('/api/track', 'POST', data);

export const getAnalyticsStats = () =>
    apiCall('/api/track', 'GET');
