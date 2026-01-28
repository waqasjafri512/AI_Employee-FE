import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

// Add Interceptor to attach token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth APIs
export const loginUser = async (credentials: any) => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
};

export const signupUser = async (userData: any) => {
    const { data } = await api.post('/auth/signup', userData);
    return data;
};

// Approvals APIs
export const getPendingApprovals = async () => {
    const { data } = await api.get('/approvals/pending');
    return data;
};

export const updateApprovalStatus = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    const { data } = await api.patch(`/approvals/${id}/status`, { status });
    return data;
};

// Dashboard APIs
export const getDashboardStats = async () => {
    const { data } = await api.get('/dashboard/stats');
    return data;
};

export const getDashboardEngagement = async () => {
    const { data } = await api.get('/dashboard/engagement');
    return data;
};

export const searchDashboard = async (query: string) => {
    const { data } = await api.get(`/dashboard/search?q=${query}`);
    return data;
};

// Simulation API
export const simulateMessage = async (from: string, text: string) => {
    const { data } = await api.post('/whatsapp/simulate', { from, text });
    return data;
};

// Business Profile APIs
export const getBusinessProfile = async () => {
    const { data } = await api.get('/businesses/profile');
    return data;
};

export const updateBusinessProfile = async (profileData: any) => {
    const { data } = await api.patch('/businesses/profile', profileData);
    return data;
};

export default api;
