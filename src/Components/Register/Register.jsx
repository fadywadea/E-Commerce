import React, { useState } from 'react'
// import Style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner'


export default function Register() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  async function registerSubmit(values) {
    setisLoading(true);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setisLoading(false);
        setError(err.response.data.message)
      })

    if (data.message === 'success') {
      navigate('/login')
    }
  }

  // function validate(values) {
  //   let errors = {};
  //   let phoneRegex = /^(011|012|015)[0-9]{8}$/;
  //   let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  //   if (!values.name) {
  //     errors.name = "name is required";
  //   } else if (values.name.length < 3) {
  //     errors.name = "name minlength is 3";
  //   } else if (values.name.length > 10) {
  //     errors.name = "name maxlength is 10";
  //   }

  //   if (!values.phone) {
  //     errors.phone = "phone is required"
  //   } else if (!phoneRegex.test(values.phone)) {
  //     errors.phone = "phone number is invalid";
  //   }

  //   if (!values.email) {
  //     errors.email = "email is required";
  //   } else if (!emailRegex.test(values.email)) {
  //     errors.email = "email number is invalid";
  //   }

  //   return errors;
  // }

  let phoneRegExp = /^(011|012|015)[0-9]{8}$/;

  let validateScheme = Yup.object({
    name: Yup.string().min(3, "name minlength is 3").max(10, "name maxlength is 10").required("name is required"),
    email: Yup.string().email("email is invalid").required("email is required"),
    phone: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("phone is required"),
    password: Yup.string().matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/, "must be * Start with a letter (either uppercase or lowercase). * Be between 6 and 9 characters in total. * Can only contain letters (A-Z or a-z) and numbers (0-9)").required("password is required"),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "re-Password pattern is invalid").required("rePassword is required")
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: ''
    },
    validationSchema: validateScheme,
    onSubmit: registerSubmit
  })
  return <>
    <div className="w-75 mx-auto py-5">
      {error !== null ? <div className="alert alert-danger">{error}</div> : ''};

      <h2>Register Now</h2>

      <form onSubmit={formik.handleSubmit}>

        <label htmlFor='name'>Name:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} className='form-control mb-2' id='name' name='name' type="text" />
        {formik.errors.name && formik.touched.name ? <div className="alert alert-danger mt-2 p-2">{formik.errors.name}</div> : ""}

        <label htmlFor='email'>Email:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control mb-2' id='email' name='email' type="email" />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div> : ""}

        <label htmlFor='phone'>Phone:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className='form-control mb-2' id='phone' name='phone' type="tel" />
        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger mt-2 p-2">{formik.errors.phone}</div> : ""}

        <label htmlFor='password'>Password:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control mb-2' id='password' name='password' type="password" />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger mt-2 p-2">{formik.errors.password}</div> : ""}

        <label htmlFor='rePassword'>rePassword:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} className='form-control mb-2' id='rePassword' name='rePassword' type="password" />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger mt-2 p-2">{formik.errors.rePassword}</div> : ""}
        <div className='d-flex'>
          {isLoading ? <button className='btn btn-lg bg-main mt-2 ms-auto'>
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.5"
              width="30"
              visible={true}
            />
          </button>
            : <button disabled={!(formik.isValid && formik.dirty)} className={!(formik.isValid && formik.dirty) ? 'btn btn-lg mt-2 ms-auto' : 'btn btn-lg bg-main text-white mt-2 ms-auto'} type='submit'>Register Now</button>
          }
        </div>
      </form>
    </div>
  </>
}

// console.log(err.response.data.message)
// console.log(data);