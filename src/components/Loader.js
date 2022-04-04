import React from "react";
import ReactDOM from "react-dom";
import Spinner from "./Spinner";

const Loader = (props) => {
  const render = () => {
    if (!props.show) return null;
    return ReactDOM.createPortal(
      <div className="spinner__container">
        <Spinner />
      </div>,
      document.querySelector("#root")
    );
  };

  return render();
};

export default Loader;
