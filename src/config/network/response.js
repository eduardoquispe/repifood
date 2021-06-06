import { Notify } from "notiflix"

const error = (res) => {
  if (res.response !== undefined) {
    if(res.response.data.status)
    {
      Notify.failure(res.response.data.msg);
      return
    }
  } else {
    Notify.failure('Opps... Ocurrió un error inesperado.');
  }
}

const success = (res) => {
  if(res.status === 2 && res.msg) {
    Notify.success(res.msg);
  } else {
    Notify.success('Realizado con exito');
  }
}

const response = {
  error,
  success
}

export default response;