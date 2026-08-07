import api from "./api";

export const getUsers = async () => {
    const response = await api.get("/users");
    return response.data;
};

export const getProjectManagers = async () => {
    const response = await api.get("/users/project-managers");
    return response.data;
};