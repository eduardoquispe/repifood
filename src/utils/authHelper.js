import { TOKEN_NAME } from "../config/constants"

export const getToken = () => {
  return window.sessionStorage.getItem(TOKEN_NAME) || '';
}

export const setToken = (token) => {
  window.sessionStorage.setItem(TOKEN_NAME, JSON.stringify(token));
}

export const deleteToken = () => {
  window.sessionStorage.removeItem(TOKEN_NAME);
}