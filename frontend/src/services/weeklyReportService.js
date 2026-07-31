import api from "./api";

export const getWeeklyReports = async () => {
    const response = await api.get("/weekly-reports");
    return response.data;
};

export const getWeeklyReportById = async (id) => {
    const response = await api.get(`/weekly-reports/${id}`);
    return response.data;
};

export const createWeeklyReport = async (weeklyReport) => {
    const response = await api.post("/weekly-reports", weeklyReport);
    return response.data;
};

export const updateWeeklyReport = async (id, weeklyReport) => {
    const response = await api.put(`/weekly-reports/${id}`, weeklyReport);
    return response.data;
};

export const deleteWeeklyReport = async (id) => {
    await api.delete(`/weekly-reports/${id}`);
};