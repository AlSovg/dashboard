import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = '/api';

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // Таймаут 10 секунд
    headers: {
        'Content-Type': 'application/json',
    },
});
