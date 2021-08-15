import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import DashboardRouting from '../../routes/DashboardRouting';
import PublicRoute from '../../routes/PublicRoute';
import PrivateRoute from '../../routes/PrivateRoute';
import './Layout.scss';
import { useDispatch, useSelector } from 'react-redux';
import { validarLogin } from "../../actions/authActions";

const Login = lazy(() => import('../../pages/Login'));


function Layout() {
  
  const { login } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validarLogin());
  }, [dispatch]);

  return (
      <Router>
        <Switch>
          <Suspense fallback={<div></div>}>
            {
              login === true ? (
                <PrivateRoute path='/' component={DashboardRouting} />
              ) : login === false ? (
                <>
                  <PublicRoute exact path='/login' component={Login} />
                  <Redirect to="/login" />
                </>
              ) : (
                null
              )
            }
          </Suspense>
        </Switch>
      </Router>
  );
}

export default Layout;