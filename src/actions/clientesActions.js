import { Notify } from "notiflix";
import { STATUS_OK } from "../config/constants";
import loadAxios from "../config/network/loadAxios";
import response from "../config/network/response";
import { CLIENTES } from "./types"

export const addCliente = (dataEnviar) => {
  return async dispatch => {
    dispatch({
      type: CLIENTES.ADD_CLIENTE
    })
    try {
      
      const res = await loadAxios({ url: '/cliente', body: dataEnviar, method: 'POST' });

      if (res.data.status === STATUS_OK) {
        dispatch({
          type: CLIENTES.ADD_CLIENTE_OK
        });
        Notify.success('Se creo un nuevo cliente');
        return true;
      } else {
        dispatch({
          type: CLIENTES.ADD_CLIENTE_ERROR
        });
        response.error(null, res.data.message);
        return false;
      }

    } catch (error) {
      dispatch({
        type: CLIENTES.ADD_CLIENTE_ERROR
      });
      response.error(error);
      return false;
    }
  }
}

export const updateCliente = (idCliente, dataEnviar) => {
  return async dispatch => {
    dispatch({
      type: CLIENTES.UPDATE_CLIENTE
    })
    try {
      
      const res = await loadAxios({ url: `/cliente/${idCliente}`, body: dataEnviar, method: 'POST' });

      if (res.data.status === STATUS_OK) {
        dispatch({
          type: CLIENTES.UPDATE_CLIENTE_OK
        });
        Notify.success('Se actualizo correctamente');
        return true;
      } else {
        dispatch({
          type: CLIENTES.UPDATE_CLIENTE_FAIL
        });
        response.error(null, res.data.message);
        return false;
      }

    } catch (error) {
      dispatch({
        type: CLIENTES.UPDATE_CLIENTE_FAIL
      });
      response.error(error);
      return false;
    }
  }
}

export const getClienteById = (idCliente) => {
  return async dispatch => {
    dispatch({
      type: CLIENTES.GET_CLIENTE
    })

    try {
      
      const res = await loadAxios({ url: `/cliente/${idCliente}`, method: 'GET' });

      if (res.data.status === STATUS_OK) {
        const cliente = {
          datos: res.data.body.cliente,
          direcciones: res.data.body.direcciones
        }
        dispatch({
          type: CLIENTES.GET_CLIENTE_OK,
          value: cliente
        });
        return true;
      } else {
        dispatch({
          type: CLIENTES.GET_CLIENTE_FAIL
        });
        response.error(null, res.data.message);
        return false;
      }

    } catch (error) {
      dispatch({
        type: CLIENTES.GET_CLIENTE_FAIL
      });
      response.error(error);
      return false;
    }
  }
}

export const deleteCliente = idCliente => {
  return async dispatch => {
    dispatch({
      type: CLIENTES.DELETE_CLIETE
    })
    try {
      const res = await loadAxios({ url: `/cliente/${idCliente}`, method:'DELETE' })

      if(res.data.status === STATUS_OK) {
        dispatch({
          type: CLIENTES.DELETE_CLIENTE_OK
        })
        response.success('Se elimino el cliente correctamente.')
        return true;
      } else {
        dispatch({
          type: CLIENTES.DELETE_CLIENTE_FAIL
        })
        response.error(null, response.data.message);
        return false;
      }
    } catch (error) {
      dispatch({
        type: CLIENTES.DELETE_CLIENTE_FAIL
      })
      response.error(error);
      return false;
    }
  }
}

export const updateEstadoCliente = async (idCliente, idEstado) => {
  try {
    const res = await loadAxios({ url: `/cliente/${idCliente}/estado/${idEstado}`, method: 'PUT' });
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
