import React from 'react';
import {
    HomeOutlined,
    UserOutlined
  } from '@ant-design/icons';  
const HomePage  = React.lazy(() => import('../pages/home'));
const UsersPage  = React.lazy(() => import('../pages/users'));
 
const routes = [
    {
        label: 'Home',
        path: '/',
        icon: <HomeOutlined />,
        component: <HomePage/>,
        children: []
    },
    {
        label: 'Users',
        path: '/users',
        icon: <UserOutlined />,
        component: <UsersPage/>,
        children: []
    }
]

export default routes;