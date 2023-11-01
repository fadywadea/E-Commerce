import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ResetPassword() {
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();

  async function ResetNewPassword(values) {
    setisLoading(true);
    let { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      values
    );
    if (data.token) {
      setisLoading(false);
      navigate("/login");
    }
  }

  let validationSchemas = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    newPassword: Yup.string().required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validationSchemas,
    onSubmit: ResetNewPassword,
  });
  
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="mx-auto w-75 my-5">
        <h2 className="title">ResetPassword</h2>
        <label htmlFor="email">Email:</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className=" form-control my-2"
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
        />
        <label htmlFor="newPassword">New password:</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control"
          id="newPassword"
          type="password"
          value={formik.values.newPassword}
        />

        {isLoading ? (
          <button className="btn btn-lg bg-main mt-2 ms-auto">
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.5"
              width="30"
              visible={true}
            />
          </button>
        ) : (
          <button className="btn bg-main text-white my-2" type="submit">
            Reset Password
          </button>
        )}
      </form>
    </>
  );
}
