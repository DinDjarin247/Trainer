import React, { useState, useEffect } from "react";
import ProfileEditor from "./ProfileEditor";
import Catalog from "./Catalog";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/joy/Typography";
import ProfPage from "./ProfPage";
import { useLocation } from "react-router-dom";

const Gallery = () => {
  const [cards, setCards] = useState([]);
  const location = useLocation();
  const { name, age, image, content, classStartDate, chipCartData, personId } =
    location.state || {};

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/galleries/${personId}`
        );
        const data = await response.json();
        setCards(data);
        console.log(data, "갤러리 랜더링 정보");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchGalleries();
  }, []);

  const addCard = (card) => {
    setCards([...cards, card]);
  };

  return (
    <>
      <div className="item">
        <ProfPage
          name={name}
          age={age}
          image={image}
          content={content}
          classStartDate={classStartDate}
          chipCartData={chipCartData}
          personId={personId}
        />
      </div>
      <div className="divider"></div>
      <div>
        <Accordion sx={{ width: "100%" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <h1>Add Gallery</h1>
          </AccordionSummary>
          <AccordionDetails>
            <ProfileEditor addCard={addCard} personId={personId} />
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="divider"></div>
      <Catalog cards={cards} avatar={image} />
    </>
  );
};

export default Gallery;
