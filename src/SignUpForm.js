import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Input from "./common/Input";
import RadioBtn from "./common/RadioBtn";
import Selector from "./common/Selector";

const SignUp = () => {
  const [data, setData] = useState(null);

  // const saveData = {
  //   name: "milad",
  //   email: "amir@mm.com",
  //   phone: "11111111111",
  //   password: "sss",
  //   passwordConfirm: "sss",
  //   gender: "0",
  // };

  const radioOptions = [
    { data: "gender", name: "male", value: "0" },
    { data: "gender", name: "female", value: "1" },
  ];
  const selectOption = [
    { label: "Entekhab konid...", value: "" },
    { label: "iran", value: "iran" },
    { label: "usa", value: "usa" },
    { label: "ireland", value: "ireland" },
  ];

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
    gender: "",
    keshvar: "",
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
    keshvar: yup.string().required("meliyat ra entekhab kon"),
  });

  const formik = useFormik({
    initialValues: data || initialValues,
    onSubmit: (values) => {
      console.log(values);
      axios.post("http://localhost:3001/users", values);
    },
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  useEffect(() => {
    axios
      .get("http://localhost:3001/users/1")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <form className="boxForm" onSubmit={formik.handleSubmit}>
        <div className="textInput">
          {/* <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <div>{formik.errors.name}</div>
          )} */}

          {/* ساده سازی input */}
          <Input name="name" formik={formik} label="Name" />
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

        <div>
          {/*  -ساده سازی رادیو باتن ها- */}
          {radioOptions.map((i) => {
            return (
              <RadioBtn
                key={i.name}
                formik={formik}
                name={i.name}
                value={i.value}
                data={i.data}
                label={i.name}
              />
            );
          })}
        </div>

        <div className="radioBox">
          {/* <div className="radio">
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
          </div> */}
        </div>
        <div>
          <Selector
            name="keshvar"
            selectOption={selectOption}
            formik={formik}
          />
        </div>
        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
        {/* <button type="button" onClick={() => setData(saveData)}>
          add data
        </button> */}
      </form>
    </div>
  );
};

export default SignUp;
