import { AUTH } from '../actions/types';

const initialState = {
  login: null,
  user: {},
  token: null,
  loading: false
}

export default function authReducer(state = initialState, action) {

  switch (action.type) {
    case AUTH.LOGIN:
      return {
        ...state,
        loading: true
      }
    case AUTH.LOGIN_EXITOSO:
      return {
        ...state,
        login: true,
        loading: false,
        token: action.value.token,
        user: action.value
      }
    case AUTH.LOGIN_ERROR:
        return {
          ...state,
          login: false,
          user: {},
          token: null,
          loading: false
        }
    case AUTH.LOGOUT:
      return {
        ...state,
        login: false,
        user: {},
        token: null,
        loading: false
      }
    default:
      return state;
  }
  
}