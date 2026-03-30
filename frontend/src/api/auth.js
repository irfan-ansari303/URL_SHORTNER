import api from "./api";

export const signup = async (data) => {
  return api.post("/user/signup", data);
};

export const login = async (data) => {
  return api.post("/user/login", data);
};
