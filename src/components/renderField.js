import React from "react";

const renderField = ({
  input,
  label,
  type,
  style,
  className,
  required,
  meta: { touched, error },
}) => {
  const inputArea = (
    <input
      {...input}
      placeholder={label}
      type={type}
      autoComplete="off"
      className={`input--100 ${className}`}
      style={style}
      required={required}
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
