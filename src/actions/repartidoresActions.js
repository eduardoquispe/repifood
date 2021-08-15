import { Notify } from "notiflix";
import authAxios from "../config/authAxios";
import { STATUS_OK } from "../config/constants";
import response from "../config/network/response"

export const addRepartidor = async (dataRepartidor) => {
  try {
    const res = await authAxios.post('/repartidor', dataRepartidor);

    if(res.data.status === STATUS_OK) {
      Notify.success('Se creo nuevo repartidor.')
      return true;
    }
    response.error(null, res.data.message);
    return false;
  } catch (error) {
    response.error(error);
    return false;
  }
}

export const getRepartidorById = async (idRepartidor) => { 
    try {
      const res = await authAxios.get(`/repartidor/${idRepartidor}`); 
      
      if(res.data.status === STATUS_OK) {
        return res.data.body;
      }
      response.error(null, res.data.message);
      return false;

    } catch (error) {
      response.error(error);
      return false;
    }
}

export const updateRepartidor = async (idRepartidor, data) => {
  try {
    const res = await authAxios.post(`/repartidor/${idRepartidor}`, data);

    if(res.data.status === STATUS_OK) {
      Notify.success('Se actualizo correctamente.')
      return true;
    }
    response.error(null, res.data.message);
    return false;

  } catch (error) {
    response.error(error);
    return false;
  }
}

export const deleteRepartidor = async (idRepartidor) => {
  try {
    const res = await authAxios.delete(`/repartidor/${idRepartidor}`);

    if(res.data.status === STATUS_OK) {
      Notify.success('Se elimino correctamente.');
      return true;
    }
    response.error(null, response.data.message);
    return false;
  } catch (error) {
    response.error(error);
    return false;
  }
}

export const updateEstadoRepartidor = async (idRepatidor, idEstado) => {
  try {
    const res = await authAxios.put(`/repartidor/${idRepatidor}/estado/${idEstado}`);
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

