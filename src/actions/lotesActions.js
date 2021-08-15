import { Notify } from "notiflix";
import authAxios from "../config/authAxios";
import { STATUS_OK } from "../config/constants";
import response from "../config/network/response";
import { getAlmacenesAsync } from "./almacenActions";
import { getProductosAsync } from "./productosActions";

export const getLoteByIdAsync = (idLote) => {
  return new Promise( async (resolve) => {
    try {
      const res = await authAxios.get(`/lote/${idLote}`);

      if(res.data.status === STATUS_OK) {
        resolve(res.data.body);
      } else {
        resolve({});
      }

    } catch (error) {
      resolve({});
    }
  })
}

export const loadFichaLote = async idLote => {
  try {
    
    const resBase = await Promise.all([getAlmacenesAsync(), getProductosAsync(), getLoteByIdAsync(idLote)]);
    
    return {
      almacenes: resBase[0],
      productos: resBase[1],
      loteData: resBase[2] 
    }

  } catch (error) {
    response.error(error);
    console.log(error);
    return false;
  }
}

export const addLote = async (datosLote) => {
  try {
    
    const res = await authAxios.post('/lote', datosLote);

    if(res.data.status === STATUS_OK){
      Notify.success('Se creo nuevo lote correctamente.');
      return true;
    } else {
      if(res.data.message) {
        response.error(null, res.data.message);
      } else {
        response.error('Opps... hubo un error inesperador.');
      }
      return false;
    }

  } catch (error) {
    response.error(error);
    return false;
  }
} 

export const updateLote = async (idLote, datosLote) => {
  try {
    
    const res = await authAxios.put(`/lote/${idLote}`, datosLote);

    if(res.data.status === STATUS_OK){
      Notify.success('Se editó correctamente.');
      return true;
    } else {
      if(res.data.message) {
        response.error(null, res.data.message);
      } else {
        response.error('Opps... hubo un error inesperador.');
      }
      return false;
    }

  } catch (error) {
    response.error(error);
    return false;
  }
} 

export const deleteLote = async idLote => {
  try {
    const res = await authAxios.delete(`/lote/${idLote}`);

    if(res.data.status === STATUS_OK) {
      response.success(null, 'Se elimino correctamente.');
      return true;
    }

    return false;

  } catch (error) {
    response.error(error);
    return false;
  }
}

