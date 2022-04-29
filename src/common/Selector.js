import React from "react";
const Selector = ({ formik, selectOption, name }) => {
  return (
    <>
      <select
        onChange={formik.handleChange}
        value={formik.values.keshvar}
        onBlur={formik.handleBlur}
        name={name}
      >
        {selectOption.map((i) => {
          return (
            <option key={i.value} value={i.value}>
              {i.label}
            </option>
          );
        })}
      </select>
      {formik.errors[name] && formik.touched[name] && (
        <div>{formik.errors[name]}</div>
      )}
    </>
  );
};

export default Selector;
