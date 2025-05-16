import React, { useState } from "react";
import DatePicker from "react-datepicker";
// import { getMoveiesByYear, getMoveiesByYearWithG } from "@/lib/tmdb";

export default function DateRangePicker({
  onDateRangeChange,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
  const [disable, setDisable] = useState(true); //검색 못하게 막을거임 스타트랑 엔드 안되어있으면

  const handleStartChange = (date) => {
    setStartDate(date);
    // if (endDate && date) {
    //   onDateRangeChange({ start: date, end: endDate });
    //   // console.log("여긴 Date피커 안입니다1"); 확인 완료
    // }
  };

  const handleEndChange = (date) => {
    setEndDate(date);
    // if (startDate && date) {
    //   onDateRangeChange({ start: startDate, end: date });
    //   // console.log("여긴 Date피커 안입니다2"); 확인 완료
    // }
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
      <button
        disabled={(startDate != null) & (endDate != null) ? !disable : disable}
        onClick={() => {
          onDateRangeChange({ start: startDate, end: endDate });
        }} // 둘 다 날짜 있으면 활성화
      >
        O
      </button>
    </div>
  );
}
