import React, { useState } from "react";
import { useLanguage } from "../LanguageContext";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateTimeRangePicker = ({ startDate, endDate, onChange, onClose }) => {
  const { t } = useLanguage();
  const [dateRange, setDateRange] = useState([
    {
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : new Date(),
      key: "selection",
    },
  ]);
  const [startHours, setStartHours] = useState("00");
  const [startMinutes, setStartMinutes] = useState("00");
  const [endHours, setEndHours] = useState("00");
  const [endMinutes, setEndMinutes] = useState("00");

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleConfirm = () => {
    const { startDate, endDate } = dateRange[0];

    const startDateTime = new Date(startDate);
    startDateTime.setHours(parseInt(startHours), parseInt(startMinutes));

    const endDateTime = new Date(endDate);
    endDateTime.setHours(parseInt(endHours), parseInt(endMinutes));

    onChange(
      startDateTime.toISOString().slice(0, 16),
      endDateTime.toISOString().slice(0, 16)
    );
    onClose();
  };

  return (
    <div
      className="date-time-range-picker"
      style={{
        width: "400px",
      }}
    >
      <DateRange
        editableDateInputs={true}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
        rangeColors={["#3d91ff"]}
        direction="horizontal"
      />
      <div
        className="time-selection"
        style={{ display: "flex", alignItems: "center", gap: "4px" }}
      >
        <div
          className="start-time"
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
        >
          <label>{t("startTime")}</label>
          <input
            type="number"
            min="0"
            max="23"
            value={startHours}
            onChange={(e) => setStartHours(e.target.value.padStart(2, "0"))}
            placeholder="HH"
          />
          :
          <input
            type="number"
            min="0"
            max="59"
            value={startMinutes}
            onChange={(e) => setStartMinutes(e.target.value.padStart(2, "0"))}
            placeholder="MM"
          />
        </div>
        <span>-</span>
        <div
          className="end-time"
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
        >
          <label>{t("endTime")}</label>
          <input
            type="number"
            min="0"
            max="23"
            value={endHours}
            onChange={(e) => setEndHours(e.target.value.padStart(2, "0"))}
            placeholder="HH"
          />
          :
          <input
            type="number"
            min="0"
            max="59"
            value={endMinutes}
            onChange={(e) => setEndMinutes(e.target.value.padStart(2, "0"))}
            placeholder="MM"
          />
        </div>
      </div>
      <div className="date-picker-actions">
        <button onClick={onClose}>{t("cancel")}</button>
        <button onClick={handleConfirm}>{t("confirm")}</button>
      </div>
    </div>
  );
};

export default DateTimeRangePicker;
