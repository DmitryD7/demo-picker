import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://stylescan.com/account/',
    withCredentials: true,
});

export const authAPI = {
    login(data) {
        return instance.post('login', data);
    },
    debug() {
        return instance.get('debug.json');
    },
};