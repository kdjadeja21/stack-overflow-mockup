import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'https://api.stackexchange.com',
});

export default axiosConfig;
