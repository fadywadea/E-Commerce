import { useFormik } from 'formik'
import React, { useState } from 'react'
// import Style from './ResetPassword.module.css'

export default function ResetPassword() {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);


  function ResetNewPassword(value) {


  }
  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: ''
    },
    // validationSchema:
    onSubmit: ResetNewPassword
  })
  return <>
    <form onSubmit={formik.handleSubmit} className='mx-auto w-75 my-5' >
      <h2 className='title'>ResetPassword</h2>
      <label htmlFor="email">Email:</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} className=' form-control my-2' id='email' name='email' type="email" value={formik.values.email} />
      {!(formik.dirty && formik.isValid) ? <div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div> : ""}
      <label htmlFor="newPassword">New password:</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' id='newPassword' type="password" value={formik.values.newPassword} />
      {!(formik.dirty && formik.isValid) ? <div className="alert alert-danger mt-2 p-2">{formik.errors.newPassword}</div> : ""}
      <button className='btn bg-main text-white my-2' type='submit'></button>
    </form>
  </>
}
