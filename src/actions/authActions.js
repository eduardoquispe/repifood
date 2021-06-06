import { AUTH } from './types';

export const loguearse = (dataEnviar) => {
  return async dispatch => {

    try {
      
    } catch (error) {
      
    }
    dispatch({
      type: AUTH.LOGIN_EXITOSO,
      value: true
    })
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: AUTH.LOGOUT,
      valu: false
    })
  }
}