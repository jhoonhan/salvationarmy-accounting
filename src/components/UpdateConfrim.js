import React from "react";

const UpdateConfrim = ({ setShowForm, currentReport, refPrint }) => {
  const onClickPrint = () => {
    window.print();
    refPrint.current.scrollTo(0, 0);
  };
  return (
    <div className="order__update-confirm">
      <div className="info">
        <h2>Report Submitted.</h2>
        <div>
          <p>Submitted on: {currentReport?.submittedDate.split("T")[0]}</p>
          <p>by: Hyungoo Han and Younchil Hong</p>
        </div>
        <div className="button-container--horizontal">
          <button onClick={() => setShowForm(true)}>Edit Report</button>
          <button onClick={onClickPrint}>print</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateConfrim;
