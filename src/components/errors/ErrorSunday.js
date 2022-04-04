import React from "react";

const ErrorSunday = ({ userError }) => {
  return (
    <div className="order__update-confirm">
      <div className="info">
        <h2>Error</h2>
        <p>{userError.message}</p>
        <p>Use the date selector above to select a Sunday</p>
      </div>
    </div>
  );
};

export default ErrorSunday;
