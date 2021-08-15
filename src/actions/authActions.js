import Notiflix from 'notiflix';
import authAxios from '../config/authAxios';
import { applyHeaders, removeHeaders } from '../config/network/authToken';
import { STATUS_OK } from '../config/constants';
import response from '../config/network/response';
import { deleteToken, getToken, setToken } from '../utils/authHelper';
import { AUTH } from './types';

export const validarLogin = () => {
  return async dispatch => {
    
    Notiflix.Loading.init({
      svgColor: "#023ca1",
      backgroundColor: "#7e7d7d30",
      'messageColor': "#3c6bbd"
    });

    Notiflix.Loading.pulse('Cargando sistema...');
    if(getToken() === '')
    {
      dispatch({
        type: AUTH.LOGIN_ERROR
      })
      Notiflix.Loading.remove();
      return;
    }
    
    try {

      const res = await authAxios.get('/decode');
    
      if(res.data.status === STATUS_OK) {
        dispatch({
          type: AUTH.LOGIN_EXITOSO,
          value: res.data.body
        })
        Notiflix.Loading.remove();
        return true;
      } else { 
        dispatch({
          type: AUTH.LOGIN_ERROR
        })
        // window.location = '/login';
      }
      Notiflix.Loading.remove();
    } catch (error) {
      response.error(error);
      dispatch({
        type: AUTH.LOGIN_ERROR
      })
      Notiflix.Loading.remove();
      // window.location = '/login';
    }
  }
}

export const loguearse = (dataEnviar) => {
  return async dispatch => {
    dispatch({
      type: AUTH.LOGIN
    })
    try {
      const res = await authAxios.post('/loginEmpleado', dataEnviar);
      if(res.data.status === STATUS_OK) {
        const token = res.data.body.token
        setToken(token);
        applyHeaders(token);
        dispatch({
          type: AUTH.LOGIN_EXITOSO,
          value: res.data.body
        })
      } else {
        dispatch({
          type: AUTH.LOGIN_ERROR
        })
        response.error(null, 'Usuario o contraseñas incorectos');
      }
    } catch (error) {
      dispatch({
        type: AUTH.LOGIN_ERROR
      })
      response.error(error);
    }
  }
}

export const logout = () => {
  return async dispatch => {
    removeHeaders();
    deleteToken();
    dispatch({
      type: AUTH.LOGOUT,
      value: false
    })
  }
}
