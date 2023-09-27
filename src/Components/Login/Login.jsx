import React, { useState, useContext } from 'react'
// import Style from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner'
// import { useContext } from 'react';
import { userContext } from '../../Context/UserContext';

export default function Login() {
  let { setUserToken } = useContext(userContext);
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  async function loginSubmit(values) {
    setisLoading(true);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch(
        (err) => {
          setisLoading(false);
          setError(err.response.data.message)
        }
      );
    if (data.message === 'success') {
      // console.log(data.token);

      setisLoading(false);
      localStorage.setItem('userToken', data.token);
      setUserToken(data.token);
      navigate('/');
    }
  };
  let validateScheme = Yup.object({
    email: Yup.string().email("email is invalid").required("email is required"),
    password: Yup.string().required("password is required"),
  });
  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validateScheme,
    onSubmit: loginSubmit
  });
  return <>
    <div className="w-75 mx-auto py-5">
      {error !== null ? <div className="alert alert-danger">{error}</div> : ''};
      <h2 className=''>Login Now</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor='email'>Email:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control mb-2' id='email' name='email' type="email" />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div> : ""}
        <label htmlFor='password'>Password:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control mb-2' id='password' name='password' type="password" />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger mt-2 p-2">{formik.errors.password}</div> : ""}
        <div className='d-flex algin-items-center'>
          {isLoading ? <button className='btn btn-lg bg-main mt-2 ms-auto'>
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.5"
              width="30"
              visible={true}
            />
          </button>
            : <>
              <Link className='btn me-auto' to={'/register'}>Register Now</Link>
              <button disabled={!(formik.isValid && formik.dirty)} className={!(formik.isValid && formik.dirty) ? 'btn btn-lg mt-2 ms-auto' : 'btn btn-lg bg-main text-white mt-2 ms-auto'} type='submit'>Login</button>
            </>
          }
        </div>
      </form>
    </div>
  </>
}