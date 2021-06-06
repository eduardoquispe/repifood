import { AUTH } from '../actions/types';

const initialState = {
  login: false,
  result: null,
  token: null,
  loading: false
}

export default function authReducer(state = initialState, action) {

  switch (action.type) {
    case AUTH.LOGIN_EXITOSO:
      return {
        ...state,
        login: true,
        // loading: true
      }
    case AUTH.LOGOUT:
      return {
        ...state,
        login: false
      }
    default:
      return state;
  }
  
}