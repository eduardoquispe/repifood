import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaGem, FaList, FaPalette } from 'react-icons/fa';
import 'react-pro-sidebar/dist/css/styles.css';
import './Sidebar.scss';

const Sidebar = ({ collapsed, toggled, handleToggleSidebar }) => {
  return (
    <div className="Sidebar">
      <ProSidebar
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        color="red"
        onToggle={handleToggleSidebar}
      >
        <SidebarContent>
          <Menu>
            <MenuItem
              icon={<FaTachometerAlt />}
            >
              <Link to="/">Dashboard</Link>
            </MenuItem>
            <MenuItem icon={<FaGem />}>
              <Link to="/clientes">Clientes</Link>
            </MenuItem>
            <MenuItem icon={<FaGem />}>
              <Link to="/lotes">Lotes</Link>
            </MenuItem>
            <MenuItem icon={<FaPalette />}>
              <Link to="/pedidos">Pedidos</Link>
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu title={'Menu'} icon={<FaList />}>
              <MenuItem>Menu 1 </MenuItem>
              <MenuItem>Menu 2 </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;