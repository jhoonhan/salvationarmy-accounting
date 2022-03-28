import React from "react";

const renderField = ({
  input,
  label,
  type,
  style,
  meta: { touched, error },
}) => {
  const inputArea = (
    <input
      {...input}
      placeholder={label}
      type={type}
      autoComplete="off"
      className="input--100"
      style={style}
    />
  );
  const textArea = <textarea {...input} placeholder={label} type={type} />;

  return (
    <>
      {label === "note" ? textArea : inputArea}
      {touched && error && <span>{error}</span>}
    </>
  );
};

export default renderField;
