import React, { lazy, Suspense, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../routes/routes';
import './Layout.scss';
import { validarLogin } from '../../actions/authActions';

const Login = lazy(() => import('../../pages/Login'));


function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const { login } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleCollapsedChange = () => {
    setCollapsed(collapsed => !collapsed);
  };

  const handleToggleSidebar = () => {
    setToggled(toggled => !toggled);
  };

  useEffect(() => {
    (() => {
      dispatch(validarLogin());
    })();
  }, [])

  return (
      <Router>
        { login === true ? (
          <div className={`app ${toggled ? 'toggled' : ''}`}>
              <Header 
                handleCollapsedChange={handleCollapsedChange}
                handleToggleSidebar={handleToggleSidebar}
              />
              <Sidebar
                collapsed={collapsed}
                toggled={toggled}
              />
              <main className="content-main">
                <Suspense fallback={<div></div>}>
                  <Switch>
                    {routes.map((route, index) => {
                      if(!route.subItems) {
                        return <Route key={route.url} path={`${route.url}`} exact={route.exact} component={route.component} />
                      } else {
                          return route.subItems.map((subitem, index) => (
                            <Route key={route.url} path={`${subitem.url}`} exact={route.exact} component={subitem.component} />
                          ))
                      }
                    })}
                    <Redirect to='/' />
                  </Switch>
                </Suspense>
              </main>
            </div>
          ) : login === false ? (
            <>
              <Suspense fallback={<div></div>}>
                <Route path="/login" exact component={Login} />
                <Redirect to='/login' />
              </Suspense>
            </>
          ) : (
            <div></div>
          )}
      </Router>
  );
}

export default Layout;