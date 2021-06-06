import axios from 'axios';
import { getToken } from '../utils/authHelper';

const accessToken = '';
const apiUrl = process.env.REACT_APP_API_URL;

const authAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
})

authAxios.interceptors.response.use(
(response) => response, 
(error) => {
  console.log(error.message)
});

export default authAxios;