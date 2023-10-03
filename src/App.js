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
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import CartContextProvider from './Context/CartContext';
// import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let routers = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'forgotPassword', element: <ForgotPassword /> },
      { path: 'resetPassword', element: <ResetPassword /> },
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

  return <CartContextProvider>
    <CounterContextProvider>
      <RouterProvider router={routers}></RouterProvider>
    </CounterContextProvider>
    {/* <Toaster /> */}
    <ToastContainer />
  </CartContextProvider>
}

export default App;
