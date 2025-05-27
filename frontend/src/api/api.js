import axios from 'axios';

const API_URL =  'http://172.20.10.5:8000'

export const api = axios.create({
    baseURL: API_URL
})