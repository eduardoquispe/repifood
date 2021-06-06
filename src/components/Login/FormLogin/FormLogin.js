import { Button, Form } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { loguearse } from '../../../actions/authActions';
const FormLogin = () => {

  const dispatch = useDispatch();
  const { result, loading } = useSelector(state => state.auth);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loguearse());
  }

  return ( 
      <Form className="form-login" onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input icon='user' iconPosition='left' label="Usuario" placeholder="Usuario" />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input icon='lock' iconPosition='left' label="Contraseña" type="password" placeholder="Contraseña" />
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