import axios from 'axios';
import { deleteToken, getToken } from '../utils/authHelper';

const accessToken = getToken();
const apiUrl = process.env.REACT_APP_API_URL;

const authAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    "x-api-key": `Bearer ${accessToken.replace(/['"]+/g, '')}`
  }
});

authAxios.interceptors.response.use(
  (response) => response, 
  (error) => {
    if(error.response.status === 500)
    {
      if(error.response !== undefined)
      {
        if(error.response.data.code === 403)
        {
          deleteToken();
          window.location.href = '/login';
        }
      }
    }
});

export default authAxios;
