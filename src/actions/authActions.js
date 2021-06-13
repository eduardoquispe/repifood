import Notiflix from 'notiflix';
import { authAxios, applyHeaders, removeHeaders } from '../config/authAxios';
import { STATUS_OK } from '../config/constants';
import response from '../config/network/response';
import { deleteToken, getToken, setToken } from '../utils/authHelper';
import { AUTH } from './types';

export const validarLogin = () => {
  return async dispatch => {
    
    Notiflix.Loading.init({
      svgColor: "#023ca1",
      backgroundColor: "rgba(132,131,131,0.191)",
      'messageColor': "#3c6bbd"
    });

    Notiflix.Loading.pulse('Cargando sistema...');

    const token = getToken();

    if(token === '') {
      dispatch(logout());
      Notiflix.Loading.remove();
      return;
    }

    setTimeout(() => {
      applyHeaders(token);
      dispatch({
        type: AUTH.LOGIN_EXITOSO,
        value: token
      })
      Notiflix.Loading.remove();      
    }, 3000);

  }
}

export const loguearse = (dataEnviar) => {
  return async dispatch => {
    dispatch({
      type: AUTH.LOGIN
    })
    try {
      const response = await authAxios.post('/loginEmpleado', dataEnviar);
      if(response.data.status === STATUS_OK) {
        setToken(response.data.body);
        applyHeaders(response.data.body);
        dispatch({
          type: AUTH.LOGIN_EXITOSO,
          value: response.data.body
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
    deleteToken();
    removeHeaders();
    dispatch({
      type: AUTH.LOGOUT,
      valu: false
    })
  }
}
