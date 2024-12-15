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
        children: [],
        roles: ["ROLE_ADMIN", "ROLE_USER"]
    },
    {
        label: 'Users',
        path: '/users',
        icon: <UserOutlined />,
        component: <UsersPage/>,
        children: [],
        roles: ["ROLE_ADMIN"]
    }
]

export default routes;