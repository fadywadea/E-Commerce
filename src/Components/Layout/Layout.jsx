import React from 'react'
// import Style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Offline } from "react-detect-offline";
// import { Helmet } from 'react-helmet';

export default function Layout() {


  return <>
    <Navbar />
    <div className="container">
      <Outlet></Outlet>
    </div>
    <div>
      <Offline>
        <div className='network'>
          <i className='fas fa-wifi'></i>  You are offline (surprise!)
        </div>
      </Offline>
    </div>
    <Footer />
  </>
}
