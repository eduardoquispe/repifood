import React, { lazy, Suspense, useState } from 'react';
import Sidebar from './Sidebar';
import Main from './Main';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import { useSelector } from 'react-redux';
import Notiflix from 'notiflix';

const Clientes = lazy(() => import('../../pages/Clientes'));
const Login = lazy(() => import('../../pages/Login'));
const Lotes = lazy(() => import('../../pages/Lotes'));
const Pedidos = lazy(() => import('../../pages/Pedidos'));


function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const { login } = useSelector(state => state.auth);

  const handleCollapsedChange = () => {
    setCollapsed(collapsed => !collapsed);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
      <Router>
        { login ? (
          <div className={`app ${toggled ? 'toggled' : ''}`}>
              <Header 
                handleCollapsedChange={handleCollapsedChange}
              />
              <Sidebar
                collapsed={collapsed}
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
              />
              <main className="content-main">
                <Suspense fallback={() => Notiflix.Loading.pulse()}>
                  <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/clientes" exact component={Clientes} />
                    <Route path="/lotes" exact component={Lotes} />
                    <Route path="/pedidos" exact component={Pedidos} />
                    <Redirect to='/' />
                  </Switch>
                </Suspense>
              </main>
            </div>
          ) : (
            <>
              <Suspense fallback={() => Notiflix.Loading.pulse()}>
                <Route path="/login" exact component={Login} />
                <Redirect to='/login' />
              </Suspense>
            </>
          )}
        
      </Router>
  );
}

export default Layout;