import React, {useContext, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import routes from './router';
import Login from './pages/login';
import NotFound from './pages/404';
import MainLayout from './pages/layouts';

const App = () => {
  const { isAuth, authorities } = useContext(AuthContext);

  console.log("isAuth", isAuth);
  useEffect(() => {})

  return (
      <Routes>
        {isAuth ? (
            <Route path="/" element={<MainLayout />}>
              {routes.map(route => {
                const hasAccess = route.roles.some(role => authorities.includes(role));
                return hasAccess ? (
                    <Route key={route.path} path={route.path} element={route.component} />
                ) : null;
              })}
              <Route path="*" element={<NotFound />} />
            </Route>
        ) : (
            <Route path="/login" element={<Login />} />
        )}
      </Routes>
  );
};

export default App;
