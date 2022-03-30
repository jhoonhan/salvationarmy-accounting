import React, { useState } from "react";
import { Field } from "redux-form";

const FixedField = ({ name, component, type, className }) => {
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <Field
      name={name}
      component={component}
      type={type}
      className={className}
      onFocus={() => setFocusedInput(name)}
      onBlur={() => setFocusedInput(null)}
      toFixed={focusedInput !== name ? true : false}
    />
  );
};

export default FixedField;
