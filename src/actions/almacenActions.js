import { Notify } from "notiflix";
import authAxios from "../config/authAxios";
import { STATUS_OK } from "../config/constants";
import loadAxios from "../config/network/loadAxios";
import response from "../config/network/response";

export const addAlmacen = async (datosAlmacen) => {
  try {
    
    const res = await loadAxios({ url: '/almacen', body: datosAlmacen, method: 'POST' });

    if(res.data.status === STATUS_OK){
      Notify.success('Se creo nuevo almacen correctamente.');
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

export const getAlmacenesAsync = () => {
  return new Promise(async (resolve) => {
      try {
        const res = await authAxios.get(`/almacen`);
  
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


export const getDepartamentosAsync = () => {
  return new Promise( async (resolve) => {
    try {
      const res = await authAxios.get('/ubigeo/departamento');

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

export const getProvinciasAsync = (idDepartamento) => {
  return new Promise(async (resolve) => {
    try {
      const res = await authAxios.get(`/ubigeo/provincia/${idDepartamento}`);

      if(res.data.status === STATUS_OK) {
        resolve(res.data.body);
      } else {
        resolve([]);
      }
    } catch (error) {
      resolve([]);
    }
  })
}

export const getDistritosAsync = (idProvincia) => {
  return new Promise(async (resolve) => {
    try {
      const res = await authAxios.get(`/ubigeo/distrito/${idProvincia}`);

      if(res.data.status === STATUS_OK) {
        resolve(res.data.body);
      } else {
        resolve([]);
      }
    } catch (error) {
      resolve([]);
    }
  })
}

export const getAlmacenAsync = (idAlmacen) => {
  return new Promise(async (resolve) => {
    if(idAlmacen) {
      try {
        const res = await authAxios.get(`/almacen/${idAlmacen}`);
  
        if(res.data.status === STATUS_OK) {
          resolve(res.data.body);
        } else {
          response.error(null, res.data.message);
          resolve({});
        }
      } catch (error) {
        response.error(error);
        resolve({});
      }
    }
    resolve({});
  })
}

export const updateAlmacen = async (idAlmacen, dataAlmacen) => {
  try {
    const res = await loadAxios({ url: `/almacen/${idAlmacen}`, body: dataAlmacen, method: 'POST' })

    if(res.data.status === STATUS_OK) {
      response.success(null, 'Se editó el almacen correctamente.');
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

export const deleteAlmacen = async idAlmacen => {
  try {
    const res = await authAxios.delete(`/almacen/${idAlmacen}`);

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

export const getDataFichaAlmacen = async (idAlmacen) => {
  try {
    
    const resBase = await Promise.all([getAlmacenAsync(idAlmacen), getDepartamentosAsync()]);
    
    const almacen = resBase[0];
    const departamentos = resBase[1];
    let provincias = [];
    let distritos = [];

    const dataEnviar = {};
    
    if (Object.keys(almacen).length > 0) {

      const ubigeo = await Promise.all([
        getProvinciasAsync(almacen.idDepartamento),
        getDistritosAsync(almacen.idProvincia)
      ]);

      provincias = ubigeo[0];
      distritos = ubigeo[1];

    }

    dataEnviar.provincias = provincias;
    dataEnviar.distritos = distritos;

    dataEnviar.departamentos = departamentos;
    dataEnviar.almacen = almacen;

    return dataEnviar;

  } catch (error) {
    response.error(error);
    console.log(error);
    return false;
  }

}
