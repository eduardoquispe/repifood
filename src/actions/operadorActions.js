import Notiflix, { Notify } from "notiflix"
import { STATUS_OK } from "../config/constants";
import loadAxios from "../config/network/loadAxios";
import response from "../config/network/response";
import { OPERADOR } from "./types";

export const getDataOperador = (setOpenModal = null) => {
  return async dispatch => {
    dispatch({
      type: OPERADOR.GET_OPERADORES
    });
    try {

      const res = await loadAxios({ url: '/empleado', method: 'GET' });
      const data = res.data;

      if(data.status === STATUS_OK) {
        dispatch({
          type: OPERADOR.GET_OPERADORES_OK,
          value: data.body[0]
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

export const getOperadorById = (idOperador, setOpenModal = null) => {
  return async dispatch => {
    dispatch({
      type: OPERADOR.GET_OPERADOR
    })

    try {
      const res = await loadAxios({ url: `/empleado/${idOperador}`, method: 'GET' })

      if(res.data.status === STATUS_OK) {
        dispatch({
          type: OPERADOR.GET_OPERADOR_OK,
          value: res.data.body
        })
        if(setOpenModal) {
          setOpenModal(true);
        }
      } else {
        dispatch({
          type: OPERADOR.GET_OPERADOR_FAIL
        })
        response.error(null, res.data.message)
      }

    } catch (error) {
      response.error(error)
    }
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
        response.error(null, res.data.message);
        return false;
      }

    } catch (error) {
      response.error(error);
      return false;
    }
  }
}

export const updateEstadoOperador = (idEmpleado, idEstado) => {
  return async dispatch => {
    dispatch({
      type: OPERADOR.UPDATE_OPERADOR_ESTADO
    })

    const dataEnviar = {
      idEmpleado: idEmpleado,
      idEstado: idEstado
    }

    try {
      const res = await loadAxios({ url: '/empleado', body: dataEnviar, method: 'PUT' })

      if(res.data.status === STATUS_OK) {
        dispatch({
          type: OPERADOR.UPDATE_OPERADOR_ESTADO_OK
        })
        Notify.success('Se actualio correctamente el estado.')
      } else {
        dispatch({
          type: OPERADOR.UPDATE_OPERADOR_ESTADO_FAIL
        })
        response.error(null, res.data.message)
      }

    } catch (error) {
      dispatch({
        type: OPERADOR.UPDATE_OPERADOR_ESTADO_FAIL
      })
      response.error(error)
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