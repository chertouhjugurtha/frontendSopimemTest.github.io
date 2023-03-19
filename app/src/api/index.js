import axios from 'axios';
import store from '../store';

const baseURL = process.env.VUE_APP_API_URL;
const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

function getToken(){
   if (store.state.user.accessToken){
        return store.state.user.accessToken
   }
   return localStorage.getItem('token')
}
api.interceptors.request.use(async (config) => {
  const token = getToken();
  config.headers.Authorization = `Bearer ${token || null}`;

  return config;
});

export default api;