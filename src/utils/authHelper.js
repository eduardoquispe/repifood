import { TOKEN_NAME } from "../config/constants/authConstants"

export const getToken = () => {
  return window.sessionStorage.getItem(TOKEN_NAME) || '';
}