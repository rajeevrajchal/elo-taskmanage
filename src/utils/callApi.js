import axios from 'axios';
import { toast } from 'react-toastify';
const BASE_URL = '/api/schedule';

export const callApi = async (method = 'GET', data) => {
    const config = {
        method,
        url: BASE_URL,
        data,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return axios(config)
        .then((response) => response.data)
        .catch((error) => {
            toast.error('Ooops Something went wront');
        });
};
