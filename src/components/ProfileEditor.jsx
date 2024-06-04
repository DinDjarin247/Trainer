import React, { useState } from "react";
import Calendar from "./Calendar";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ProfileEditor = ({ addCard, personId }) => {
  const [title, setTitle] = useState("");
  const [subheader, setSubheader] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  const handleSave = async () => {
    const newCard = {
      title,
      subheader,
      image,
      content,
      date,
      personId,
    };

    try {
      const response = await fetch("http://localhost:5000/galleries1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
      });
      const data = await response.json();
      addCard(data);
      console.log(data, "갤러리 생성");
    } catch (error) {
      console.error("Error:", error);
    }

    // 상태 초기화
    setTitle("");
    setSubheader("");
    setImage("");
    setContent("");
    setDate("");
  };

  return (
    <div>
      <TextField
        required
        id="outlined-required"
        label="Name"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="grow"
      />
      <TextField
        required
        id="outlined-required"
        label="Age"
        type="text"
        value={subheader}
        onChange={(e) => setSubheader(e.target.value)}
        placeholder="Subheader"
        className="grow"
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
      />
      <Calendar setDate={setDate} />

      <TextField
        id="standard-multiline-flexible"
        label="Multiline"
        multiline
        maxRows={4}
        variant="standard"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <Button variant="contained" endIcon={<SendIcon />} onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default ProfileEditor;
