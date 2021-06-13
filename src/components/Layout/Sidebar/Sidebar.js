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

const Sidebar = ({ collapsed, toggled, handleToggleSidebar }) => {
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
            {routes.map((route, index) => {
              if(!route.subItems) {
                return <MenuItem key={route.url} icon={route.icon}>
                  <Link to={`${route.url}`}>{route.title}</Link>
                </MenuItem>
              } else {
                return <SubMenu title={route.title} key={route.url} icon={route.icon}>
                  {route.subItems.map((subitem, index) => (
                    <MenuItem key={subitem.url} icon={subitem.icon}>
                      <Link to={`${subitem.url}`}>{subitem.title}</Link>
                    </MenuItem>
                  ))}
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