import api from "./api";

export const getHistory = async () => {
    return api.get("/url");
};

export const createShortUrl = async (url) => {
    return api.post("/url", { url });
};
