import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import TextField from "@mui/material/TextField";

import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const TrainingTag = ({ sendChip }) => {
  const [chipData, setChipData] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [chipCartData, setChipCartData] = React.useState([]);

  React.useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("http://localhost:5000/tagShowPT");
        const data = await response.json();
        setChipData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTags();
  }, []);

  const handleDelete = (chipTodelete) => async () => {
    try {
      await fetch(`http://localhost:5000/trainingShow/${chipTodelete.tagId}`, {
        method: "DELETE",
      });
      setChipData((chips) =>
        chips.filter((chip) => chip.tagId !== chipTodelete.tagId)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddChip = async () => {
    if (
      inputValue.trim() === "" ||
      chipData.some((chip) => chip.label === inputValue.trim())
    ) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/tagsPT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: inputValue.trim() }),
      });
      const newChip = await response.json();
      setChipData([...chipData, newChip]);
      setInputValue("");
      console.log(newChip, "PT");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddChip();
      event.preventDefault();
    }
  };

  const handleClick = (chip) => {
    console.log(`You clicked ${chip.label}, ${chip.tagId} Chip.`, chip);
    if (chipCartData.some((cartChip) => cartChip.tagId === chip.tagId)) return;

    setChipCartData([...chipCartData, chip]);
  };

  const handleDeleteCart = (chipToDelete) => () => {
    setChipCartData((chips) =>
      chips.filter((chip) => chip.tagId !== chipToDelete.tagId)
    );
  };

  const handleSendChip = () => {
    sendChip(chipCartData);
    setChipCartData([]);
  };

  return (
    <>
      <FormControl sx={{ width: 1500 }}>
        <TextField
          label="메모태그"
          id="filled-size-normal"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          variant="filled"
          InputLabelProps={{
            sx: {
              color: "#3c9de6",
            },
          }}
          InputProps={{
            sx: {
              color: "#3c9de6",
              "& .MuiInput-underline:before": {
                borderBottomColor: "#3c9de6",
              },
              "&:hover .MuiInput-underline:before": {
                borderBottomColor: "#3c9de6",
              },
              "&.Mui-focused .MuiInput-underline:after": {
                borderBottomColor: "#3c9de6",
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
        {chipData.map((data) => {
          let icon;

          if (data.label === "Add_the_Chip") {
            icon = <TagFacesIcon />;
          }

          return (
            <ListItem key={data.id}>
              <Chip
                color="primary"
                icon={icon}
                label={data.label}
                onClick={() => handleClick(data)}
                onDelete={
                  data.label === "Add_the_Chip" ? undefined : handleDelete(data)
                }
              />
            </ListItem>
          );
        })}
      </Paper>

      <Paper
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          flexWrap: "wrap",
          listStyle: "none",
          bgcolor: "#294590",
          p: 0.5,
          m: 5,
        }}
        component="ul"
      >
        <h1>Tag Cart</h1>
        {chipCartData.length > 0 &&
          chipCartData.map((cartData) => (
            <ListItem key={cartData.id}>
              <Chip
                color="secondary"
                label={cartData.label}
                onDelete={handleDeleteCart(cartData)}
              />
            </ListItem>
          ))}
        <Button onClick={handleSendChip}>확정</Button>
      </Paper>
    </>
  );
};

export default TrainingTag;
