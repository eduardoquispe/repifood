import './Login.scss';
import { Grid, Image } from 'semantic-ui-react';
import FormLogin from '../../components/Login/FormLogin';
import LogoLogin from '../../assets/img/login/logo_login.png';

const Login = () => {

  return ( 
    <div className="Login">
      <div className="Login__container">
        <Grid columns={2}>
          <Grid.Column className="Login__left">
            <Image src={LogoLogin} className="Login__left-logo" />
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