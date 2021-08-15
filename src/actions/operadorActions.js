import Notiflix, { Notify } from "notiflix"
import authAxios  from "../config/authAxios";
import { STATUS_OK } from "../config/constants";
import loadAxios from "../config/network/loadAxios";
import response from "../config/network/response";
import { OPERADOR } from "./types";

export const getDataOperador = (idOperador, setOpenModal = null) => {
  return async dispatch => {
    dispatch({
      type: OPERADOR.GET_OPERADORES
    });
    try {

      const res = await loadAxios({ url: `/empleado/${idOperador}`, method: 'GET' });
      const data = res.data;

      if(data.status === STATUS_OK) {
        dispatch({
          type: OPERADOR.GET_OPERADORES_OK,
          value: data.body
        })
        if(setOpenModal) {
          setOpenModal(true);
        }

      } else {
        Notiflix.Notify.failure('Opps... hubo un problema inesperado');
      }

    } catch (error) {
      dispatch({
        type: OPERADOR.GET_OPERADORES_FAIL
      })
      response.error(error);
    }

  }
}

export const getOperadorById = (idOperador) => {
  return async dispatch => {
    return new Promise(async (resolve, reject) => {
      dispatch({
        type: OPERADOR.GET_OPERADOR
      })
      try {
        const res = await authAxios.get(`/empleado/${idOperador}`);
  
        if(res.data.status === STATUS_OK) {
          dispatch({
            type: OPERADOR.GET_OPERADOR_OK,
            value: res.data.body
          })
          resolve(true);
        } else {
          dispatch({
            type: OPERADOR.GET_OPERADOR_FAIL
          })
          response.error(null, res.data.message)
          resolve(false);
        }
  
      } catch (error) {
        response.error(error)
        resolve(false);
      }
    })
  }
}

export const addOperador = (dataEnviar) => {
  return async dispatch => {
    dispatch({
      type: OPERADOR.ADD_OPERADOR
    })

    try {
      const res = await loadAxios({ url: '/empleado', body: dataEnviar, method: 'POST' })

      if(res.data.status === STATUS_OK) {
        dispatch({
          type: OPERADOR.ADD_OPERADOR_OK
        })
        
        Notify.success('Se creo un nuevo empleado');

        return true;
      } else {
        dispatch({
          type: OPERADOR.ADD_OPERADOR_FAIL
        })
        response.error(null, res.data.message);
        return false;
      }

    } catch (error) {
      dispatch({
        type: OPERADOR.ADD_OPERADOR_FAIL
      })
      response.error(error);
      return false;
    }
  }
}


export const updateOperador = (idOperador, dataEnviar) => {
  return async dispatch => {
    dispatch({
      type: OPERADOR.UPDATE_OPERADOR
    })

    try {
      const res = await loadAxios({ url: `/empleado/${idOperador}`, body: dataEnviar, method: 'POST' })

      if(res.data.status === STATUS_OK) {
        dispatch({
          type: OPERADOR.UPDATE_OPERADOR_OK
        })
        Notify.success('Se actualio correctamente.')
        return true;
      } else {
        dispatch({
          type: OPERADOR.UPDATE_OPERADOR_FAIL
        })
        response.error(null, res.data.message)
        return false;
      }

    } catch (error) {
      dispatch({
        type: OPERADOR.UPDATE_OPERADOR_FAIL
      })
      response.error(error)
      return false;
    }
  }
}

export const deleteOperador = (idOperador, requestDataIfNeeded = null) => {
  return async dispatch => {
    dispatch({
      type: OPERADOR.DELETE_OPERADOR
    })

    try {
      const res = await loadAxios({ url: `/empleado/${idOperador}`, method: 'DELETE' })

      if (res.data.status === STATUS_OK) {
        dispatch({
          type: OPERADOR.DELETE_OPERADOR_OK
        })
        
        Notify.success('Se elimino al operador correctamente.')

        if(requestDataIfNeeded) {
          requestDataIfNeeded(true);
        }

      } else {
        dispatch({
          type: OPERADOR.GET_OPERADOR_FAIL
        })
        response.error(null, res.data.message);
      }

    } catch (error) {
      dispatch({
        type: OPERADOR.DELETE_OPERADOR_ERROR
      })
      response.error(error);
    }
  }
}

export const updateEstadoOperador = async (idOperador, idEstado) => {
  try {
    const res = await authAxios.put(`/empleado/${idOperador}/estado/${idEstado}`);
    if(res.data.status === STATUS_OK) {
      Notify.success('Se cambio el estado correctamente');
      return true;
    } else {
      response.error(null, 'Opps hubo un error inesperado...');
      return false;
    }
  } catch (error) {
    response.error(error);
  }
}

export const getPerfiles = () => {
  return async dispatch => {
    return new Promise(async (resolve) => {
      dispatch({
        type: OPERADOR.GET_PERFILES
      })
  
      try {
        const res = await authAxios.get('/perfil');

        resolve(false);

        if(res.data.status === STATUS_OK) {
          dispatch({
            type: OPERADOR.GET_PERFILES_OK,
            payload: res.data.body
          })
          resolve(true);
        }
      } catch (error) {
        dispatch({
          type: OPERADOR.GET_PERFILES_FAIL
        })
        response.error(null, 'Ocurrio un error al cargar los perfiles.');
        resolve(false);
      }
    })
  }
}

export const getDataEditarOperador = (idOperador) => {
  return async dispatch => {
    const res = await Promise.all([dispatch(getOperadorById(idOperador)), dispatch(getPerfiles())]);
    return res[0];
  }
}
