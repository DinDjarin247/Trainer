import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState, useEffect } from "react";
import { Today } from "@mui/icons-material";

const Calendar = ({ setDate }) => {
  const [value, setValue] = useState(dayjs(Today));

  const handleChange = (newValue) => {
    setValue(newValue);
    setDate(newValue.format("YYYY-MM-DD"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DateTimePicker
          label="Basic date time picker"
          value={value}
          onChange={handleChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default Calendar;
