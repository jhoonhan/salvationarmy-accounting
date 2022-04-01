import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

const ErrorModal = ({ userError }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (userError) setShow(true);
    if (!userError) setShow(false);
  }, [userError]);

  const render = () => {
    if (!show) return null;
    return (
      <div className="error-modal__container">
        <div className="error__message">
          <p>{userError.message || "Unknown Error"}</p>
        </div>
        <button onClick={() => setShow(false)}>Hide</button>
      </div>
    );
  };

  return render();
};

const mapStateToProps = ({ userError }) => {
  return {
    userError,
  };
};

export default connect(mapStateToProps, {})(ErrorModal);
