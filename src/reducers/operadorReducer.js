import { OPERADOR } from "../actions/types";

const initialState = {
  operadores: [],
  operador: {},
  perfiles: []
}

export default function operadorReducer(state = initialState, action) {
  switch (action.type) {
    case OPERADOR.GET_OPERADORES_OK:      
      return {
        ...state,
        operador: action.value
      }
    case OPERADOR.GET_OPERADOR_OK:
      return {
        ...state,
        operador: action.value
      }
    case OPERADOR.GET_PERFILES_OK:
      return {
        ...state,
        perfiles: action.payload
      }
    default:
      return state;
  }
}