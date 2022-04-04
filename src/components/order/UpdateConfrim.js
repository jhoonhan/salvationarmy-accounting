import React from "react";
import { capitalizeName } from "../helpers/nameHelper";

const UpdateConfrim = ({ setShowForm, currentReport, refPrint }) => {
  const onClickPrint = () => {
    refPrint.current.scrollTo(0, 0);
    window.print();
  };
  return (
    <div className="order__update-confirm">
      <div className="info">
        <h2>Report Submitted</h2>
        <div>
          <p>Submitted on: {currentReport?.submittedDate.split("T")[0]}</p>
          <p>
            by: {capitalizeName(currentReport?.counter1)} and{" "}
            {capitalizeName(currentReport?.counter2)}
          </p>
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
