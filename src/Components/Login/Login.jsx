import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { userContext , useNavigate } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
  let { setUserToken } = useContext(userContext);
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  async function loginSubmit(values) {
    setisLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setisLoading(false);
        setError(err.response.data.message);
      });
    if (data.message === "success") {
      setisLoading(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      // window.location.href = "/";
      navigate('/');
    }
  }

  let validateScheme = Yup.object({
    email: Yup.string().email("email is invalid").required("email is required"),
    password: Yup.string().required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateScheme,
    onSubmit: loginSubmit,
  });

  return (
    <>
      <div className="w-75 mx-auto my-5">
        <Helmet>
          <meta name="description" content="Web site created using create-react-app"/>
          <meta name="keywords" content="HTML5 CSS3 Bootstrap JS React" />
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <title>Login</title>
        </Helmet>
        {error !== null ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          ""
        )}
        <h2 className="title my-4">Login Now</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            className="form-control mb-2"
            id="email"
            name="email"
            type="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="password">Password:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            className="form-control mb-2"
            id="password"
            name="password"
            type="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}
          <div className="d-flex algin-items-center forget">
            {isLoading ? (
              <button className="btn btn-lg bg-main mt-2 ms-auto text-center">
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.5"
                  width="30"
                  visible={true}
                />
              </button>
            ) : (
              <>
                <Link className="btn mx-0 me-auto my-auto py-0" to={"/forgotPassword"}>
                  forget your password ?
                </Link>
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  className={
                    !(formik.isValid && formik.dirty)
                      ? "btn  mt-2 ms-auto"
                      : "btn bg-main text-white mt-2 ms-auto"
                  }
                  type="submit"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}