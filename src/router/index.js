import React from 'react';
import {
    HomeOutlined,
    UserOutlined
  } from '@ant-design/icons';  
const HomePage  = React.lazy(() => import('../pages/home'));
const ProductsPage  = React.lazy(() => import('../pages/products'));
const BillsPage  = React.lazy(() => import('../pages/bills'));
const BillPage  = React.lazy(() => import('../pages/bills/Bill'));
const EditBillPage  = React.lazy(() => import('../pages/bills/Edit'));

const routes = [
    {
        label: 'Home',
        path: '/',
        icon: <HomeOutlined />,
        component: <HomePage/>,
        children: [],
        roles: ["ROLE_ADMIN", "ROLE_USER"]
    },
    {
        label: 'Products',
        path: '/products',
        icon: <UserOutlined />,
        component: <ProductsPage/>,
        children: [],
        roles: ["ROLE_ADMIN"]
    },
    {
        label: 'Bills',
        path: '/bills',
        icon: <UserOutlined />,
        component: <BillsPage/>,
        children: [],
        roles: ["ROLE_ADMIN"]
    },
    {
        label: 'Bills',
        path: '/bills/:id',
        component: <BillPage/>,
        hidden: true,
        roles: ["ROLE_ADMIN"]
    },
    {
        label: 'Bills',
        path: '/bills/:id/edit',
        component: <EditBillPage/>,
        hidden: true,
        roles: ["ROLE_ADMIN"]
    },
]

export default routes;