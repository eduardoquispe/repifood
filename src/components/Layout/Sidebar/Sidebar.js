import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import './Sidebar.scss';
import routes from '../../../routes/routes';
import { useSelector } from 'react-redux';

const Sidebar = ({ collapsed, toggled, handleToggleSidebar }) => {

  const { user = {} } = useSelector(state => state.auth);

  if(!Object.keys(user).length) return null;

  return (
    <div className="Sidebar">
      <ProSidebar
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="sm"
        width={200}
        onToggle={handleToggleSidebar}
      >
        <SidebarContent>
          <Menu popperArrow={true}>
            {routes(user.idPerfil).map((route) => {
              if((!route.subItems || route.component !== null) && !route.noShow ) {
                return <MenuItem key={route.url} icon={route.icon}>
                  <Link to={`${route.url}`}>{route.title}</Link>
                </MenuItem>
              } else {
                return <SubMenu title={route.title} key={route.url} icon={route.icon}>
                  {route.subItems.map((subitem) => {
                    if(!subitem.noShow) {
                      return <MenuItem key={subitem.url} icon={subitem.icon}>
                        <Link to={`${subitem.url}`}>{subitem.title}</Link>
                      </MenuItem> 
                    } else {
                      return null
                    }
                  })}
                </SubMenu>
              }
            })}
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;