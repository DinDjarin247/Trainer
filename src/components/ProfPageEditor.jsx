import React, { useState } from "react";
import Calendar from "./Calendar";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import ChipTag from "./ChipTag";
import FormControl from "@mui/material/FormControl";
import ImgLinkConverter from "./ImgLinkConverter";

const ProfPageEditor = ({ addPerson }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [classStartDate, setClassStartDate] = useState("");
  const [chipCartData, setChipCartData] = useState([]);

  const handleSave = async () => {
    if (
      name &&
      age &&
      image &&
      content &&
      classStartDate &&
      chipCartData.length > 0
    ) {
      const newPerson = {
        name,
        age,
        image,
        content,
        classStartDate,
        chipCartData,
      };
      try {
        const response = await fetch("http://localhost:5000/persons1", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPerson),
        });
        const data = await response.json();
        addPerson(data);
        console.log(data, "입력부");
      } catch (error) {
        console.error("Error:", error);
      }

      // 상태 초기화
      setName("");
      setAge("");
      setImage("");
      setContent("");
      setClassStartDate("");
      setChipCartData([]);
    } else {
      console.log("모든 필드를 입력해주세요.");
    }
  };

  const handleReceiveChip = (chips) => {
    setChipCartData(chips);
  };
  const handleAddImage = (url) => {
    setImage((prevImages) => [...prevImages, url]);
  };

  return (
    <div>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          bgcolor: "#24272a",
          flexWrap: "wrap",
          listStyle: "none",
          color: "primary",
          p: 0.5,
          m: 0,
        }}
      >
        <FormControl sx={{ width: 1500 }}>
          <TextField
            required
            id="outlined-required"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Title"
            className="grow"
            InputLabelProps={{
              sx: {
                color: "#f76f00", // Label color
              },
            }}
            InputProps={{
              sx: {
                color: "#f76f00", // Text color
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#f76f00", // Outline color
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#f76f00",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#f76f00",
                },
              },
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Age"
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Subheader"
            className="grow"
            InputLabelProps={{
              sx: {
                color: "#f76f00",
              },
            }}
            InputProps={{
              sx: {
                color: "#f76f00",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#f76f00",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#f76f00",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#f76f00",
                },
              },
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="img"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
            className="grow"
            InputLabelProps={{
              sx: {
                color: "#f76f00",
              },
            }}
            InputProps={{
              sx: {
                color: "#f76f00",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#f76f00",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#f76f00",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#f76f00",
                },
              },
            }}
          />
          <Paper sx={{ mt: 2, p: 2, bgcolor: "#fae4e3" }}>
            <h3>Profile</h3>
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                padding: 0,
                listStyle: "none",
              }}
            >
              <a href={image} target="_blank" rel="noopener noreferrer">
                <img
                  src={image}
                  style={{
                    maxWidth: "400px",
                    maxHeight: "400px",
                    width: "auto",
                    height: "auto",
                    position: "center",
                  }}
                />
              </a>
            </ul>
          </Paper>
          <ImgLinkConverter onUpload={handleAddImage} />
        </FormControl>

        <Calendar setDate={setClassStartDate} />

        <FormControl sx={{ width: 1500 }}>
          <TextField
            id="standard-multiline-flexible"
            label="특이사항"
            multiline
            maxRows={4}
            variant="standard"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            InputLabelProps={{
              sx: {
                color: "#f76f00",
              },
            }}
            InputProps={{
              sx: {
                color: "#f76f00",
                "& .MuiInput-underline:before": {
                  borderBottomColor: "#f76f00",
                },
                "&:hover .MuiInput-underline:before": {
                  borderBottomColor: "#f76f00",
                },
                "&.Mui-focused .MuiInput-underline:after": {
                  borderBottomColor: "#f76f00",
                },
              },
            }}
          />
        </FormControl>

        <ChipTag sendChip={handleReceiveChip} />

        <Button variant="contained" endIcon={<SendIcon />} onClick={handleSave}>
          Save
        </Button>
      </Paper>
    </div>
  );
};

export default ProfPageEditor;
