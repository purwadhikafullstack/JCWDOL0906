import axios from "axios";

export const apiRequest = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    // timeout: 3000,
    headers: {
        Accept: 'application/json',
    },
});