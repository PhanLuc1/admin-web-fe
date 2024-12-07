import logo from './logo.svg';
import routes from './router';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NotFound from './pages/404';
import Home from './pages/home';
import Users from './pages/users';
import { useState } from 'react';
import MainLayout from './pages/layouts';

function App() {
  const [isAuth, setIsAuth] = useState(true); // TODO: Update authentication


  return ( <div>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={isAuth ? <MainLayout/> : <p>Login</p>}>
        {
          routes.map(route => <Route path={route.path} key={route.path} element={route.component} />)
        }
        <Route path='*' element={NotFound}/>
      </Route>
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
