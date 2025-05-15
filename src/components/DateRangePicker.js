import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function DateRangePicker({ onDateRangeChange }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(new Date());

  const handleStartChange = (date) => {
    setStartDate(date);
    if (endDate && date) {
      onDateRangeChange({ start: date, end: endDate });
    }
  };

  const handleEndChange = (date) => {
    setEndDate(date);
    if (startDate && date) {
      onDateRangeChange({ start: startDate, end: date });
    }
  };

  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <label>From:</label>
      <DatePicker
        selected={startDate}
        onChange={handleStartChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start date"
        dateFormat="yyyy-MM-dd"
      />
      <label>To:</label>
      <DatePicker
        selected={endDate}
        onChange={handleEndChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End date"
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
}
