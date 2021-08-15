import authAxios from "../config/authAxios"

export const getPedidoById = async idPedido => {
  try {
    const res = await authAxios.get(`/pedido/${idPedido}`)

    return res.data;

  } catch (error) {
    console.log(error)
    return null;
  }
}