import { combineReducers } from "redux";
import authReducer from "./authReducer";
import clientesReducers from "./clientesReducers";

export default combineReducers({
  clientes: clientesReducers,
  auth: authReducer
});