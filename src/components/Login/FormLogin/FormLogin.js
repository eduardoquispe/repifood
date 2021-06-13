import { Button, Form } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { loguearse } from '../../../actions/authActions';
import { useState } from 'react';
const FormLogin = () => {

  const dispatch = useDispatch();
  const { result, loading } = useSelector(state => state.auth);
  const [dataEnviar, setDataEnviar] = useState({
    userName: '',
    password: ''
  });

  const { userName, password } = dataEnviar;

  const handleChange = e => {
    setDataEnviar({
      ...dataEnviar,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loguearse(dataEnviar));
  }

  return ( 
      <Form className="form-login" onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input 
            icon='user' 
            iconPosition='left' 
            label="Usuario" 
            placeholder="Usuario"
            name="userName"
            value={userName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input 
            icon='lock' 
            iconPosition='left' 
            label="Contraseña" 
            type="password" 
            placeholder="Contraseña"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="form-login__submit">
          <Button type="submit" primary loading={loading} disabled={loading}>
            Acceder
          </Button>
        </Form.Group>
        {result && (
          <div className="alert alert-danger" role="alert" id="login__alert">
            Error de usuario y/o contraseña, por favor revise e intente nuevamente
          </div>
        )}
      </Form>
  );
}

export default FormLogin;