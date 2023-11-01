import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [isLoading, setisLoading] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);
  let navigate = useNavigate();

  //! Forgot password
  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
  });

  async function sendCode(value) {
    setisLoading(true);
    let { data } = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        value
      )
      .catch((err) => {
        setisLoading(false);
        setError(err.response.data.message);
      });
    if (data.statusMsg === "success") {
      setisLoading(false);
      document.querySelector(".forgotPassword").classList.add("d-none");
      document.querySelector(".verifyCode").classList.remove("d-none");
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: sendCode,
  });

  //! Receive verification code
  let validationSchema2 = Yup.object({
    resetCode: Yup.string().required("Code is required"),
  });

  async function verificationCode(values) {
    setisLoading2(true);
    let { data } = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      )
      .catch((error) => {
        setisLoading2(false);
        setError2(error.response.data.message);
      });
    if (data.status === "Success") {
      navigate("/resetPassword");
    }
  }

  let verifyFormik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validationSchema2,
    onSubmit: verificationCode,
  });

  return (
    <>
      {/* Forgot password */}
      <div className="forgotPassword">
        <form onSubmit={formik.handleSubmit} className="mx-auto w-75 my-5">
          {error !== null ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            ""
          )}
          <h3 className="title my-4">Forgot password</h3>
          <label htmlFor="email">Email:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            className=" form-control my-2"
            id="email"
            name="email"
            type="email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="alert alert-danger p-2">{formik.errors.email}</div>
          ) : (
            ""
          )}
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
            <button
              disabled={!(formik.dirty && formik.isValid)}
              className="btn btn-lg bg-main text-white my-2"
              type="submit"
            >
              Send Code
            </button>
          )}
        </form>
      </div>

      {/* Receive verification code */}
      <div className="verifyCode d-none">
        <form
          onSubmit={verifyFormik.handleSubmit}
          className="mx-auto w-75 my-5"
        >
          {error2 !== null ? (
            <div className="alert alert-danger">{error2}</div>
          ) : (
            ""
          )}
          <h3 className="title my-4">Please enter your verification code</h3>
          <label htmlFor="resetCode">Code:</label>
          <input
            onBlur={verifyFormik.handleBlur}
            onChange={verifyFormik.handleChange}
            value={verifyFormik.values.resetCode}
            className=" form-control my-2"
            id="resetCode"
            name="resetCode"
            type="text"
          />
          {verifyFormik.touched.resetCode && verifyFormik.errors.resetCode ? (
            <div className="alert alert-danger p-2">
              {verifyFormik.errors.resetCode}
            </div>
          ) : (
            ""
          )}
          {isLoading2 ? (
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
            <button
              disabled={!(verifyFormik.dirty && verifyFormik.isValid)}
              className="btn btn-lg bg-main text-white my-2"
              type="submit"
            >
              verifying
            </button>
          )}
        </form>
      </div>
    </>
  );
}
