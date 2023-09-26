// import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Notfound from './Components/Notfound/Notfound';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import CounterContextProvider from './Context/CounterContext';
import { useContext, useEffect } from 'react';
import { userContext } from './Context/UserContext';



let routers = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'products', element: <Products /> },
      { path: 'categories', element: <Categories /> },
      { path: 'brands', element: <Brands /> },
      { path: 'cart', element: <Cart /> },
      { path: '*', element: <Notfound /> },
    ]
  }
]);

function App() {
  let { setUserToken } = useContext(userContext);

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      setUserToken(localStorage.getItem('userToken'))
    }
  })

  return <CounterContextProvider>
    <RouterProvider router={routers}></RouterProvider>
  </CounterContextProvider>
}

export default App;
