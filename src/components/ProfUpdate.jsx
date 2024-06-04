import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import ChipTag from "./ChipTag";
import FormControl from "@mui/material/FormControl";
import ImgLinkConverter from "./ImgLinkConverter";
import { useLocation, useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ProfUpdate = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [classStartDate, setClassStartDate] = useState("");
  const [chipCartData, setChipCartData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { personId } = location.state;

  useEffect(() => {
    const fetchPersonData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/persons1/${personId}`
        );
        const data = await response.json();
        setName(data.name);
        setAge(data.age);
        setImage(data.image);
        setContent(data.content);
        setClassStartDate(data.classStartDate);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchPersonChipData = async () => {
      try {
        const responseChip = await fetch(
          `http://localhost:5000/persons/${personId}/tags`
        );
        const dataChip = await responseChip.json();
        setChipCartData(dataChip);
      } catch (error) {
        console.error("ChipError:", error);
      }
    };

    if (personId !== 0) {
      fetchPersonData();
      fetchPersonChipData();
    }
  }, [personId]);

  const handleSave = async () => {
    if (
      name &&
      age &&
      image &&
      content &&
      classStartDate &&
      chipCartData.length > 0
    ) {
      const updatedPerson = {
        name,
        age,
        image,
        content,
        classStartDate,
        chipCartData,
      };
      try {
        const response = await fetch(
          `http://localhost:5000/persons1/${personId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPerson),
          }
        );

        if (response.ok) {
          console.log("Person updated successfully");
          navigate("/profIndex"); // Navigate to another page after update
        } else {
          console.error("Error updating person");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("모든 필드를 입력해주세요.");
    }
  };

  const handleReceiveChip = (chips) => {
    setChipCartData(chips);
  };

  const handleDelete = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/persons/${personId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Person deleted successfully");
        navigate("/profIndex"); // Navigate to another page after deletion
      } else {
        console.error("Error deleting person");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setOpen(false);
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
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            bgcolor: "#1c354d",
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {chipCartData.map((data) => {
            let icon;

            if (data.label === "Add_the_Chip") {
              icon = <FaceIcon />;
            }

            return (
              <ListItem key={data.tagId}>
                <Chip color="primary" icon={icon} label={data.label} />
              </ListItem>
            );
          })}
        </Paper>
        <ChipTag sendChip={handleReceiveChip} />

        <Button endIcon={<SendIcon />} onClick={handleSave}>
          Save
        </Button>
        <Button endIcon={<DeleteIcon />} onClick={handleDelete}>
          Delete
        </Button>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this person? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            style={{ width: "100%" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="primary"
            style={{ width: "100%" }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfUpdate;
