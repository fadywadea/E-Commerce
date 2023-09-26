import React, { useContext } from 'react'
// import Style from './Navbar.module.css'
import { Link } from 'react-router-dom'
import logo from '../../Assets/images/freshcart-logo.svg'
import { CounterContext } from '../../Context/CounterContext'

export default function Navbar() {
  let { counter } = useContext(CounterContext);

  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="fresh market logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home {counter}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories">Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/brands">Brands</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">Cart</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <i className='fab fa-instagram mx-2'></i>
              <i className='fab fa-facebook mx-2'></i>
              <i className='fab fa-tiktok mx-2'></i>
              <i className='fab fa-twitter mx-2'></i>
              <i className='fab fa-linkedin mx-2'></i>
              <i className='fab fa-youtube mx-2'></i>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
}
