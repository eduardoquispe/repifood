import { CLIENTES } from "../actions/types";

const initialState = {
  cliente: {}
};

export default function clientesReducers(state = initialState, action) {
  switch (action.type) {
    case CLIENTES.GET_CLIENTE_OK:
      return {
        ...state,
        cliente: action.value
      }
    default:
      return state;
  }
}
