import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Input } from "semantic-ui-react";

const FormularioUsuario = () => {

  const { operador } = useSelector(state => state.operadores);

  const [datosForm, setDatosForm] = useState({
    usuarios: ''
  })

  const { usuarios } = datosForm;

  useEffect(() => {
    (() => {
      if(Object.keys(operador).length > 0) {
        setDatosForm(operador);
      }
    })()
  }, [operador])

  return ( 
    <div className="FormularioUsuario">
      <Form>
        <Form.Group>
          <Form.Field
            id='form-input-control-first-name'
            control={Input}
            label='Usuario'
            value={usuarios}
            width={6}
          />
          <Form.Field
            id='form-input-control-last-name'
            control={Input}
            label='Contraseña'
            type='password'
            width={6}
          />
          <Form.Field
            id='form-input-control-last-name'
            control={Input}
            label='Repetir contraseña'
            type='password'
            width={6}
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default FormularioUsuario;