import React from 'react'
// import Style from './Register.module.css'
import { useFormik } from 'formik'

export default function Register() {
  function registerSubmit(values) {
    console.log(values);
  }

  function validate(values) {
    let errors = {};
    let phoneRegex = /^(011|012|015)[0-9]{8}$/;

    if (!values.name) {
      errors.name = "name is required";
    } else if (values.name.length < 3) {
      errors.name = "name minlength is 3";
    } else if (values.name.length > 10) {
      errors.name = "name maxlength is 10";
    }

    if (!values.phone) {
      errors.phone = "phone is required"
    } else if (!phoneRegex.test(values.phone)) {
      errors.phone = "phone number is invalid";
    }

    return errors;
  }


  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: ''
    },
    validate
    ,
    onSubmit: registerSubmit
  })
  return <>
    <div className="w-75 mx-auto py-5">
      <h3>Register Now</h3>
      <form onSubmit={formik.handleSubmit}>
        
        <label htmlFor='name'>Name:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} className='form-control mb-2' id='name' name='name' type="text" />
        <div className="alert alert-danger mt-2 p-2">{formik.errors.name}</div>
        
        <label htmlFor='email'>Email:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control mb-2' id='email' name='email' type="email" />
        
        <label htmlFor='phone'>Phone:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className='form-control mb-2' id='phone' name='phone' type="tel" />
        <div className="alert alert-danger mt-2 p-2">{formik.errors.phone}</div>
        
        <label htmlFor='password'>Password:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control mb-2' id='password' name='password' type="password" />
        
        <label htmlFor='rePassword'>rePassword:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} className='form-control mb-2' id='rePassword' name='rePassword' type="password" />
        
        <button type='submit' className='btn bg-main text-white mt-2'>Register</button>
      </form>
    </div>
  </>
}
