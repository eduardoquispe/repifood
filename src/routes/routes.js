import React, { lazy} from 'react';
import { FaDolly, FaList, FaPallet, FaShippingFast, FaTachometerAlt, FaUsers } from "react-icons/fa";

const Clientes = lazy(() => import('../pages/Clientes'));
const Lotes = lazy(() => import('../pages/Lotes'));
const Pedidos = lazy(() => import('../pages/Pedidos'));
const Dashboard = lazy(() => import('../pages/Dasboard'));
const Categorias = lazy(() => import('../pages/Categorias'));
const Platos = lazy(() => import('../pages/Platos'));
const Operadores = lazy(() => import('../pages/Operadores'));
const Almacenes = lazy(() => import('../pages/Almacenes'));
const Repartidores = lazy(() => import('../pages/Repartidores'));
const Enrutar = lazy(() => import('../pages/Enrutar'));

const routes = [
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
    icon: <FaUsers />,
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
    title: 'almacenes',
    url: '/almacenes',
    icon: <FaUsers />,
    exact: true,
    component: Almacenes
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
        url: '/platos',
        icon: <FaList />,
        exact: true,
        component: Platos,
      },
      {
        title: 'categorias',
        url: '/categorias',
        icon: <FaList />,
        exact: true,
        component: Categorias,
      }
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
];


export default routes;