import authAxios from "../authAxios";

export const applyHeaders = (accessToken) => {
  authAxios.defaults.headers['x-api-key'] = `Bearer ${accessToken.replace(/['"]+/g, '')}`;
}

export const removeHeaders = () => {
  delete authAxios.defaults.headers['x-api-key'];
}
