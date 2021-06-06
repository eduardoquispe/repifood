import './Login.scss';
import { Grid } from 'semantic-ui-react';
import FormLogin from '../../components/Login/FormLogin';

const Login = () => {

  return ( 
    <div className="Login">
      <div className="Login__container">
        <Grid columns={2}>
          <Grid.Column>
            
          </Grid.Column>
          <Grid.Column>
            <FormLogin />
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
}

export default Login;