import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Field, reduxForm } from "redux-form";
import logo from "../../assets/images/logo.svg";
import logoFooter from "../../assets/images/logo_footer.png";
import renderField from "../helpers/renderField";
import { signIn, createError } from "../../actions";

const SignIn = ({ signIn, createError, handleSubmit, submitting }) => {
  const password = "leelee";
  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      signIn();
    }
  }, []);

  const onLoginSubmit = (e) => {
    if (e.password === password) {
      signIn();
      localStorage.setItem("loggedIn", true);
    } else {
      createError({
        name: "wrongPassword",
        message: "Wrong password. Please try again.",
      });
    }
  };
  return (
    <div className="signin__container">
      <div className="overlay"></div>
      <div className="signin__wrapper">
        <svg viewBox="0 0 50 60" className="img__logo">
          <use href={`${logo}#logo`}></use>
        </svg>
        <img src={logoFooter} alt="logoFooter" />
        <form onSubmit={handleSubmit(onLoginSubmit)} className="signin__box">
          <Field
            name="password"
            type="password"
            component={renderField}
            required="required"
            label="Password"
          />
          <button type="submit" disabled={submitting}>
            Log In
          </button>
        </form>
        <p className="version">v.2.0.1</p>
      </div>
    </div>
  );
};

const wrappedForm = reduxForm({
  form: "signinForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(SignIn);

const mapStateToProps = (state) => {
  return {
    user: state.user,
    userError: state.userError,
  };
};

export default connect(mapStateToProps, { signIn, createError })(wrappedForm);
