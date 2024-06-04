import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import ProfPage from "./ProfPage";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { Button } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ProfSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [chipData, setChipData] = useState([]);
  const [selectedChips, setSelectedChips] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("http://localhost:5000/tags");
        const data = await response.json();
        setChipData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTags();
  }, []);
  //v.1, v.2
  // const handleSearch = async () => {
  //   if (!searchTerm.trim()) {
  //     setFilteredPersons([]);
  //     alert("검색어를 입력하거나 칩을 선택하시오");
  //     return;
  //   } else if (selectedChips.length === 0) {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:5000/search?q=${searchTerm}`
  //       );
  //       const data = await response.json();
  //       setFilteredPersons(data);
  //     } catch (error) {
  //       console.error("Error!:", error);
  //     }
  //   }

  //   try {
  //     const chipLabels = selectedChips.map((chip) => chip.label).join(",");
  //     const query = `http://localhost:5000/searchPlus?w=${searchTerm}&chips=${chipLabels}`;
  //     const response = await fetch(query);
  //     const data = await response.json();
  //     setFilteredPersons(data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setFilteredPersons([]);
      alert("검색어를 입력하거나 칩을 선택하시오");
      return;
    } else if (selectedChips.length === 0) {
      try {
        const response = await fetch(
          `http://localhost:5000/search?q=${searchTerm}`
        );
        const data = await response.json();
        setFilteredPersons(data);
      } catch (error) {
        console.error("Error!:", error);
      }
    }

    try {
      const chipLabels = selectedChips.map((chip) => chip.label).join(",");
      const chipCount = selectedChips.length; // 선택된 칩의 갯수
      const query = `http://localhost:5000/searchPlus?w=${searchTerm}&chips=${chipLabels}&chipCount=${chipCount}`; // 선택된 칩의 갯수를 쿼리에 추가
      const response = await fetch(query);
      const data = await response.json();
      setFilteredPersons(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = (chip) => {
    setSelectedChips((prevSelectedChips) => {
      if (
        prevSelectedChips.some(
          (selectedChip) => selectedChip.tagId === chip.tagId
        )
      ) {
        return prevSelectedChips.filter(
          (selectedChip) => selectedChip.tagId !== chip.tagId
        );
      } else {
        return [...prevSelectedChips, chip];
      }
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: 1,
        bgcolor: "#bc8a66",
        "&:hover": {
          bgcolor: "#e1c0a8",
        },
      }}
    >
      <Stack spacing={3} sx={{ width: "100%" }}>
        <Paper
          component="form"
          sx={{
            width: "100%",
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <TextField
            id="standard-multiline-flexible"
            variant="standard"
            type="text"
            placeholder="Search by name or chip"
            sx={{
              width: "100%",
            }}
            value={searchTerm}
            className="grow"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton
            type="button"
            sx={{ p: "10px", width: 80, height: 80 }}
            aria-label="search"
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <Box
          component="section"
          sx={{ p: 2, border: "1px dashed grey", bgcolor: "#e1c0a8" }}
        >
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              listStyle: "none",
              bgcolor: "#e1c0a8",
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
                <ListItem key={data.tagId}>
                  <Chip
                    color={
                      selectedChips.some((chip) => chip.tagId === data.tagId)
                        ? "secondary"
                        : "primary"
                    }
                    icon={icon}
                    label={data.label}
                    onClick={() => handleClick(data)}
                  />
                </ListItem>
              );
            })}
          </Paper>
        </Box>
      </Stack>
      <div className="container">
        {filteredPersons.length === 0 && searchTerm.trim() !== "" ? (
          <p>No results found.</p>
        ) : (
          filteredPersons.map((person, index) => (
            <div className="item" key={index}>
              <ProfPage
                name={person.name}
                age={person.age}
                image={person.image}
                content={person.content}
                classStartDate={person.classStartDate}
                chipCartData={person.chipCartData}
                personId={person.personId}
              />
            </div>
          ))
        )}
      </div>
    </Box>
  );
};

export default ProfSearch;
