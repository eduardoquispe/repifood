import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "./routes";
import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import { useState } from "react";
import { useSelector } from "react-redux";

const RoutingProtected = () => {

  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const handleCollapsedChange = () => {
    setCollapsed(collapsed => !collapsed);
  };

  const handleToggleSidebar = () => {
    setToggled(toggled => !toggled);
  };

  const { user = {} } = useSelector(state => state.auth);

  if(!Object.keys(user).length) return null;
  

  return (
    <div className={`app ${toggled ? "toggled" : ""}`}>
      <Header
        handleCollapsedChange={handleCollapsedChange}
        handleToggleSidebar={handleToggleSidebar}
      />
      <Sidebar collapsed={collapsed} toggled={toggled} />
      <main className="content-main">
        <Suspense fallback={<div></div>}>
          <Switch>
            {routes(user.idPerfil).map((route) => {
              if (!route.subItems || route.component !== null) {
                return (
                  <Route
                    key={route.url}
                    path={`${route.url}`}
                    exact={route.exact}
                    component={route.component}
                  />
                );
              } else {
                return route.subItems.map((subitem) => (
                  <Route
                    key={route.url}
                    path={`${subitem.url}`}
                    exact={route.exact}
                    component={subitem.component}
                  />
                ));
              }
            })}
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </main>
    </div>
  );
};

export default RoutingProtected;
