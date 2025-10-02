import axios from 'axios';

const API_URL = 'http://INSIRA_IP_DA_API_DO_BACKEND_AQUI:8000';

export const api = axios.create({
    baseURL: API_URL
})