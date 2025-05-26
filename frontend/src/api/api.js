import axios from 'axios';

const API_URL =  'http://192.168.1.196:8000'

export const api = axios.create({
    baseURL: API_URL
})