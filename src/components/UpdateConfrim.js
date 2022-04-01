import React from "react";

const UpdateConfrim = ({ setShowForm, currentReport }) => {
  return (
    <div className="order__update-confirm">
      <h2>Report Submitted.</h2>
      <p>Submitted on: {currentReport?.submittedDate.split("T")[0]}</p>
      <div className="button-container--horizontal">
        <button onClick={() => setShowForm(true)}>Edit Report</button>
        <button onClick={window.print}>print</button>
      </div>
    </div>
  );
};

export default UpdateConfrim;
