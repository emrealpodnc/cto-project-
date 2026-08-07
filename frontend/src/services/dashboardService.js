import api from "./api";

export const getDashboard = async () => {
    const response = await api.get("/dashboard");
    return response.data;
};

export const getDashboardByManager = async (kullaniciId) => {
    const response = await api.get(`/dashboard/${kullaniciId}`);
    return response.data;
};

export const getUpcomingDeadlines = async () => {
    const response = await api.get("/dashboard/upcoming-deadlines");
    return response.data;
};

export const getUpcomingDeadlinesByManager = async (kullaniciId) => {
    const response = await api.get(
        `/dashboard/upcoming-deadlines/${kullaniciId}`
    );
    return response.data;
};