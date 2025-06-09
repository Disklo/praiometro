import axios from 'axios';

const API_URL =  'http://192.168.0.103:8000'

export const api = axios.create({
    baseURL: API_URL
})