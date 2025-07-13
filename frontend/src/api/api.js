import axios from 'axios';

const API_URL = 'http://177.153.64.84:8000';

export const api = axios.create({
    baseURL: API_URL
})