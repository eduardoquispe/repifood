const initialState = {
  clientes: []
};

export default function clientesReducers(state = initialState, action) {
  switch (action.type) {
    case 'TIPO':
      return;
    default:
      return state;
  }
}