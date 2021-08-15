import { Notify } from "notiflix";
import authAxios from "../config/authAxios";
import { STATUS_OK } from "../config/constants";
import loadAxios from "../config/network/loadAxios";
import response from "../config/network/response"

export const getCategorasAll = async () => {
  try {
    const res = await authAxios.get('/categoria');
  
    if(res.data.status === STATUS_OK) {
      return res.data.body;
    } else {
      return false;
    }

  } catch (error) {
    response.error(error);
    return false;
  }
}

export const getCategorasAllAsync = async () => {
  
  return new Promise(async (resolve) => {
    try {
      const res = await authAxios.get('/categoria');
    
      if(res.data.status === STATUS_OK) {
        resolve(res.data.body);
      } else {
        resolve(false);
      }
  
    } catch (error) {
      resolve(false);
    }
  })
}


export const addPlato = async (datosPlato) => {
  try {
    
    const res = await loadAxios({ url: '/producto', body: datosPlato, method: 'POST' });

    if(res.data.status === STATUS_OK){
      Notify.success('Se creo nuevo plato correctamente.');
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

export const getPlatoByIdAsync = (idProducto) => {
  return new Promise( async (resolve) => {
    try {
      const res = await authAxios.get(`/producto/${idProducto}`);

      if(res.data.status === STATUS_OK) {
        resolve(res.data.body);
      } else {
        resolve(false);
      }

    } catch (error) {
      resolve(false);
    }
  })
}

export const getDataEditPlato = async (idPlato) => {
  
  try {
    const res = await Promise.all([getCategorasAllAsync(), getPlatoByIdAsync(idPlato)]);

    if(res[1]) {
      return {
        plato: res[1],
        categorias: res[0] 
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    response.error(null, 'Opps... hubo un error inesperado');
    return false;
  }

}

export const getProductosAsync = () => {
  return new Promise(async (resolve) => {
      try {
        const res = await authAxios.get(`/producto`);
  
        if(res.data.status === STATUS_OK) {
          resolve(res.data.body);
        } else {
          response.error(null, res.data.message);
          resolve([]);
        }
      } catch (error) {
        response.error(error);
        resolve([]);
      }
  })
}

export const updatePlato = async (idPlato, dataPlato) => {
  try {
    const res = await loadAxios({ url: `/producto/${idPlato}`, body: dataPlato, method: 'POST' })

    if(res.data.status === STATUS_OK) {
      Notify.success('Se editó el plato correctamente.');
      return true;
    } else {
      if(res.data.message) {
        response.error(null, res.data.message);
      } else {
        response.error('Opps... hubo un error inesperador.');
      }
    }

  } catch (error) {
    response.error(error);
    return false;
  }
}

export const deleteProducto = async idProducto => {
  try {
    const res = await authAxios.delete(`/producto/${idProducto}`);

    if(res.data.status === STATUS_OK) {
      Notify.success('Se elimino el producto correctamente.')
      return true;
    }
    
    if(res.data.message) {
      response.error(null, res.data.message);
    } else {
      response.error('Opps... hubo un error inesperador.');
    }

    return false;

  } catch (error) {
    response.error(error);
  }
}
