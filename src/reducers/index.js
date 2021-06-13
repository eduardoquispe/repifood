import { combineReducers } from "redux";
import authReducer from "./authReducer";
import clientesReducers from "./clientesReducers";
import operadorReducer from "./operadorReducer";

export default combineReducers({
  clientes: clientesReducers,
  operadores: operadorReducer,
  auth: authReducer
});