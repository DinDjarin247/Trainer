import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { Box, Button } from "@mui/material";
import { format } from "date-fns"; // date-fns 패키지 사용하여 날짜 형식 지정
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const TermCalendar = ({ setTempDateTerm }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleChange = (item) => {
    setState([item.selection]);
  };

  const handleConfirm = () => {
    const startDate = format(state[0].startDate, "yyyy-MM-dd");
    const endDate = format(state[0].endDate, "yyyy-MM-dd");
    setTempDateTerm(`${startDate}~${endDate}`);
  };

  return (
    <Box>
      <DateRange
        editableDateInputs={true}
        onChange={handleChange}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
      <Button onClick={handleConfirm} variant="Primary" sx={{ mt: 2 }}>
        SAVE
      </Button>
    </Box>
  );
};

export default TermCalendar;
