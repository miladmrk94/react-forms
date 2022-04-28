import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const SignUp = () => {
  const [data, setData] = useState(null);

  const saveData = {
    name: "milad",
    email: "amir@mm.com",
    phone: "11111111111",
    password: "sss",
    passwordConfirm: "sss",
    gender: "0",
  };
  console.log(data);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
    gender: "",
  };
  const phoneRegExp = /^[0-9]{11}$/;

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("name is required")
      .min(6, "بیشتر از 6 کاراکتر"),
    email: yup.string().required("email is required").email(),
    phone: yup
      .string()
      .required("phone is required")
      .matches(phoneRegExp, "Phone number is not valid"),
    password: yup.string().required("pass is required"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    gender: yup.string().required("vajeb"),
  });

  const formik = useFormik({
    initialValues: data || initialValues,
    onSubmit: (values) => console.log(values),
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  return (
    <div>
      <form className="boxForm" onSubmit={formik.handleSubmit}>
        <div className="textInput">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <div>{formik.errors.name}</div>
          )}
        </div>
        <div className="textInput">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <div>{formik.errors.email}</div>
          )}
        </div>
        <div className="textInput">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && (
            <div>{formik.errors.phone}</div>
          )}
        </div>
        <div className="textInput">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <div>{formik.errors.password}</div>
          )}
        </div>
        <div className="textInput">
          <label htmlFor="passwordConfirm">passwordConfirm</label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
            <div>{formik.errors.passwordConfirm}</div>
          )}
        </div>
        <div className="radioBox">
          <div className="radio">
            <input
              type="radio"
              checked={formik.values.gender === "0"}
              name="gender"
              value="0"
              id="0"
              onChange={formik.handleChange}
            />
            <label htmlFor="0">male</label>
          </div>
          <div className="radio">
            <input
              id="1"
              type="radio"
              checked={formik.values.gender === "1"}
              name="gender"
              value="1"
              onChange={formik.handleChange}
            />
            <label htmlFor="1">female</label>
          </div>
        </div>
        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
        <button onClick={() => setData(saveData)}>add data</button>
      </form>
    </div>
  );
};

export default SignUp;
