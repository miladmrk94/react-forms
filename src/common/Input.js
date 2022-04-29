import React from "react";
const Input = ({ label, name, formik }) => {
  return (
    <>
      <label htmlFor="name">{label}</label>
      <input
        id="name"
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors[name] && formik.touched[name] && (
        <div>{formik.errors[name]}</div>
      )}
    </>
  );
};

export default Input;
