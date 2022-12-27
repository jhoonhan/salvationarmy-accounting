import React from "react";
import { capitalizeName } from "../helpers/nameHelper";

const ReportFilter = ({ selectedUser, selectedYear, setSelectedYear }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
      }}
    >
      {/* Year Selector */}
      <div className="ui__container">
        <div className="flex__vertical--nogap">
          <label>Select a Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            name="year"
            style={{ height: "4rem" }}
          >
            <option value={0}>All Years</option>
            <option value={2022}>2022</option>
            <option value={2021}>2021</option>
          </select>
        </div>
      </div>

      {/* Selected User */}
      <div className="ui__container">
        <div className="flex__vertical--nogap">
          <label>Selected User</label>
          <p
            style={{
              height: "4rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            {selectedUser?.name
              ? `${selectedUser.nameK && selectedUser.nameK} / ${capitalizeName(
                  selectedUser.name
                )}`
              : "Everyone"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportFilter;
