import React from "react";

const UpdateConfrim = ({ setShowForm, currentReport }) => {
  return (
    <div className="order__update-confirm">
      <h2>Report has already been submitted.</h2>
      <p>Submitted on: {currentReport?.submittedDate.split("T")[0]}</p>
      <button onClick={() => setShowForm(true)}>Edit Report</button>
    </div>
  );
};

export default UpdateConfrim;
