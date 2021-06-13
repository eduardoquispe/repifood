import axios from 'axios';
import { getToken } from '../utils/authHelper';

const accessToken = getToken();
const apiUrl = process.env.REACT_APP_API_URL;

let clientAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
})

clientAxios.interceptors.response.use(
  (response) => response, 
  (error) => {
    console.log(error.message)
});

export const authAxios = clientAxios;

export const applyHeaders = (accessToken) => {
  clientAxios = axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}

export const removeHeaders = () => {
  clientAxios = axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: null
    }
  })
}
