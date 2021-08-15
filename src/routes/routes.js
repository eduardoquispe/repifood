import React, { lazy} from 'react';
import { FaDolly, FaList, FaPallet, FaShippingFast, FaStore, FaTachometerAlt, FaUserCog, FaUsers } from "react-icons/fa";

const Clientes = lazy(() => import('../pages/Clientes'));
const Lotes = lazy(() => import('../pages/Lotes'));
const Pedidos = lazy(() => import('../pages/Pedidos'));
const Dashboard = lazy(() => import('../pages/Dasboard'));
// const Categorias = lazy(() => import('../pages/Categorias'));
const Productos = lazy(() => import('../pages/Productos'));
const Operadores = lazy(() => import('../pages/Operadores'));
const Almacenes = lazy(() => import('../pages/Almacenes'));
const Repartidores = lazy(() => import('../pages/Repartidores'));
const Enrutar = lazy(() => import('../pages/Enrutar'));
const FichaAlmacen = lazy(() => import('../pages/Almacenes/FichaAlmacen'));
const FichaProductos = lazy(() => import('../pages/Productos/Ficha'));

const routesAdmin = () => [
  {
    title: 'dashboard',
    url: '/',
    icon: <FaTachometerAlt />,
    exact: true,
    component: Dashboard
  },
  {
    title: 'operadores',
    url: '/operadores',
    icon: <FaUserCog />,
    exact: true,
    component: Operadores
  },
  {
    title: 'clientes',
    url: '/clientes',
    icon: <FaUsers />,
    exact: true,
    component: Clientes
  },
  {
    title: 'Logística de reparto',
    url: '',
    icon: <FaShippingFast />,
    exact: true,
    component: null,
    subItems:[
      {
        title: 'repartidores',
        url: '/repartidores',
        icon: <FaList />,
        exact: true,
        component: Repartidores,
      },
      {
        title: 'enrutar',
        url: '/enrutar',
        icon: <FaList />,
        exact: true,
        component: Enrutar,
      },
    ]
  },
  {
    title: 'productos',
    url: '',
    icon: <FaPallet />,
    exact: true,
    component: null,
    subItems: [
      {
        title: 'Productos',
        url: '/productos',
        icon: <FaList />,
        exact: true,
        component: Productos,
      },
      {
        title: 'Ficha Productos',
        url: '/productos/ficha',
        icon: <FaList />,
        exact: true,
        component: FichaProductos,
        noShow: true
      },
      {
        title: 'Ficha Productos',
        url: '/productos/ficha/:id',
        icon: <FaList />,
        exact: true,
        component: FichaProductos,
        noShow: true
      },
      // {
      //   title: 'categorias',
      //   url: '/categorias',
      //   icon: <FaList />,
      //   exact: true,
      //   component: Categorias,
      // }
    ]
  },
  {
    title: 'logística',
    url: '',
    icon: <FaDolly />,
    exact: true,
    component: null,
    subItems: [
      {
        title: 'lotes',
        url: '/lotes',
        icon: <FaList />,
        exact: true,
        component: Lotes,
      },
      {
        title: 'almacenes',
        url: '/almacenes',
        icon: <FaStore />,
        exact: true,
        component: Almacenes,
      },
      {
        title: 'almacenes',
        url: '/almacenes/ficha',
        icon: <FaStore />,
        exact: true,
        component: FichaAlmacen,
        noShow: true
      },
      {
        title: 'almacenes',
        url: '/almacenes/ficha/:id',
        icon: <FaStore />,
        exact: true,
        component: FichaAlmacen,
        noShow: true
      },
      {
        title: 'pedidos',
        url: '/pedidos',
        icon: <FaList />,
        exact: true,
        component: Pedidos,
      },
    ]
  },
]

const routesVendedor = () => [
  {
    title: 'dashboard',
    url: '/',
    icon: <FaTachometerAlt />,
    exact: true,
    component: Dashboard
  },
  {
    title: 'Logística de reparto',
    url: '',
    icon: <FaShippingFast />,
    exact: true,
    component: null,
    subItems:[
      {
        title: 'repartidores',
        url: '/repartidores',
        icon: <FaList />,
        exact: true,
        component: Repartidores,
      },
      {
        title: 'enrutar',
        url: '/enrutar',
        icon: <FaList />,
        exact: true,
        component: Enrutar,
      },
    ]
  },
  {
    title: 'productos',
    url: '',
    icon: <FaPallet />,
    exact: true,
    component: null,
    subItems: [
      {
        title: 'platos',
        url: '/productos',
        icon: <FaList />,
        exact: true,
        component: Productos,
      },
      {
        title: 'platos',
        url: '/productos/ficha/:id',
        icon: <FaList />,
        exact: true,
        component: FichaProductos,
        noShow: true
      },
      // {
      //   title: 'categorias',
      //   url: '/categorias',
      //   icon: <FaList />,
      //   exact: true,
      //   component: Categorias,
      // }
    ]
  },
  {
    title: 'logística',
    url: '',
    icon: <FaDolly />,
    exact: true,
    component: null,
    subItems: [
      {
        title: 'lotes',
        url: '/lotes',
        icon: <FaList />,
        exact: true,
        component: Lotes,
      },
      {
        title: 'pedidos',
        url: '/pedidos',
        icon: <FaList />,
        exact: true,
        component: Pedidos,
      },
    ]
  },
]


const routes = (idPerfil = null) => {
  
  switch (parseInt(idPerfil)) {
    case 1:
      return routesAdmin();
    case 2:
      return routesVendedor();
    default:
      return [];
  }
}

export default routes;