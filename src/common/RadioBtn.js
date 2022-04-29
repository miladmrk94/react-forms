import React from "react";
const RadioBtn = ({ label, formik, value, name, data }) => {
  return (
    <>
      <input
        type="radio"
        checked={formik.values.gender === value}
        name={data}
        value={value}
        id={name}
        onChange={formik.handleChange}
      />
      <label htmlFor={name}>{label}</label>
    </>
  );
};

export default RadioBtn;
