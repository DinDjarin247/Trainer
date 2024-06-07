import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Modal, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";

import ImgLinkConverter from "../components/ImgLinkConverter";
import TermCalendar from "../components/TermCalendar";

import TrainingTag from "./TrainingTag";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TrainingEditor = ({ addTraining }) => {
  const [name, setName] = useState(""); // pt이름
  const [price, setPrice] = useState(""); // pt가격
  const [dtoImages, setDtoImages] = useState([]); // pt상세 이미지들
  const [dtoContent, setDtoContent] = useState(""); // pt상세 설명
  const [trainTerm, setTrainTerm] = useState(""); // pt기간
  const [chipCartData, setChipCartData] = useState([]); // pt chipTag
  const [open, setOpen] = useState(false); // modal open state
  const [tempDateTerm, setTempDateTerm] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSavePT = async () => {
    if (
      name &&
      price &&
      dtoImages.length > 0 &&
      dtoContent &&
      trainTerm &&
      chipCartData.length > 0
    ) {
      const newTraining = {
        name,
        price,
        dtoContent,
        trainTerm,
        images: dtoImages,
        chipCartData,
      };
      try {
        const response = await fetch("http://localhost:5000/trainings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTraining),
        });
        const data = await response.json();
        addTraining(data);
        console.log(data, "PT입력부");
      } catch (error) {
        console.error("Error:", error);
      }
      setName("");
      setPrice("");
      setDtoImages([]);
      setDtoContent("");
      setTrainTerm("");
      setChipCartData([]);
    } else {
      console.log("모든 필드를 입력해주세요.");
    }
  };

  const handleReceiveChip = (chips) => {
    setChipCartData(chips);
  };

  const handleAddImage = (url) => {
    setDtoImages((prevImages) => [...prevImages, url]);
  };

  const handleConfirmDate = () => {
    setTrainTerm(tempDateTerm);
    handleClose();
  };

  return (
    <>
      <div>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
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
            />
            <TextField
              required
              id="outlined-required"
              label="Price"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Subheader"
              className="grow"
            />
          </FormControl>
          <FormControl sx={{ width: 1500 }}>
            <Paper sx={{ mt: 2, p: 2, bgcolor: "#fae4e3" }}>
              <h3>Added Images:</h3>
              <ul
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  padding: 0,
                  listStyle: "none",
                }}
              >
                {dtoImages.map((url, index) => (
                  <li
                    key={index}
                    style={{
                      margin: "0 10px",
                      background: "#B22222",
                      padding: 5,
                    }}
                  >
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={url}
                        alt={`Added ${index}`}
                        style={{
                          maxWidth: "100px",
                          maxHeight: "100px",
                          width: "auto",
                          height: "auto",
                        }}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </Paper>
            <ImgLinkConverter onUpload={handleAddImage} />
            <Button variant="outlined" onClick={handleOpen}>
              Select Term
            </Button>
            <TextField
              id="outlined-read-only-input"
              label="Training Term"
              value={trainTerm}
              InputProps={{
                readOnly: true,
              }}
              sx={{ ml: 2 }}
            />
          </FormControl>
          <FormControl sx={{ width: 1500 }}>
            <TextField
              id="standard-multiline-flexible"
              label="설명"
              multiline
              maxRows={4}
              variant="standard"
              value={dtoContent}
              onChange={(e) => setDtoContent(e.target.value)}
              placeholder="Content"
            />
          </FormControl>
          <TrainingTag sendChip={handleReceiveChip} />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSavePT}
          >
            Save
          </Button>
        </Paper>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TermCalendar setTempDateTerm={setTempDateTerm} />
            <Button
              onClick={handleConfirmDate}
              variant="contained"
              sx={{ mt: 2 }}
            >
              확인
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default TrainingEditor;
