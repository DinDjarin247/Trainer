import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TrainingCard from "./TrainingCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Grid, Typography } from "@mui/material";
import { Box, Sheet } from "@mui/joy";
import ProfPage from "../components/ProfPage";
import ChartTabView from "../ChartDataShow/ChartTabView";
import TrainingSearch from "./TrainingSearch";

const TrainingJoin = () => {
  const [trainings, setTrainings] = useState([]);
  const location = useLocation();
  const { personId } = location.state;
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [classStartDate, setClassStartDate] = useState("");
  const [chipCartData, setChipCartData] = useState([]);
  const [data, setData] = useState({
    columns: {
      "column-1": {
        id: "column-1",
        title: "💪Training💪",
        cardIds: [],
      },
      "column-2": {
        id: "column-2",
        title: "🛒CART🛒",
        cardIds: [],
      },
    },
    cards: {},
    columnOrder: ["column-1", "column-2"],
  });

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch("http://localhost:5000/trainingShow");
        const data = await response.json();
        const cardIds = data.map((training, index) => `card-${index}`);
        const cards = data.reduce((acc, training, index) => {
          acc[`card-${index}`] = { id: `card-${index}`, content: training };
          return acc;
        }, {});

        setTrainings(data);
        setData((prevData) => ({
          ...prevData,
          columns: {
            ...prevData.columns,
            "column-1": {
              ...prevData.columns["column-1"],
              cardIds: cardIds,
            },
          },
          cards: cards,
        }));
      } catch (error) {
        console.error("Error:", error);
      }
    };

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

    fetchTrainings();
  }, [personId]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newCardIds = Array.from(start.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        cardIds: newCardIds,
      };

      setData((prevData) => ({
        ...prevData,
        columns: {
          ...prevData.columns,
          [newColumn.id]: newColumn,
        },
      }));
    } else {
      const startCardIds = Array.from(start.cardIds);
      startCardIds.splice(source.index, 1);
      const newStart = {
        ...start,
        cardIds: startCardIds,
      };

      const finishCardIds = Array.from(finish.cardIds);
      finishCardIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        cardIds: finishCardIds,
      };

      setData((prevData) => ({
        ...prevData,
        columns: {
          ...prevData.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      }));
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2} style={{ padding: "20px" }}>
          {data.columnOrder.map((columnId, colIndex) => {
            const column = data.columns[columnId];
            const cards = column.cardIds.map((cardId) => data.cards[cardId]);

            return (
              <Grid item xs={6} key={column.id}>
                {colIndex === 1 && ( // Only render ProfPage for the second column
                  <Sheet
                    sx={{
                      bgcolor: "#5e030c",
                      borderRadius: "sm",
                      p: 1.5,
                      my: 1.5,
                      display: "flex",
                      gap: 2,
                      "& > div": { flex: 1 },
                    }}
                  >
                    {" "}
                    <ProfPage
                      name={name}
                      age={age}
                      image={image}
                      content={content}
                      classStartDate={classStartDate}
                      chipCartData={chipCartData}
                      personId={personId}
                    />
                  </Sheet>
                )}
                {colIndex === 1 && ( // Only render ProfPage for the second column
                  <Sheet
                    sx={{
                      bgcolor: "#5e030c",
                      borderRadius: "sm",
                      p: 1.5,
                      my: 1.5,
                      display: "flex",
                      gap: 2,
                      "& > div": { flex: 1 },
                    }}
                  >
                    <Box
                      mb={4}
                      sx={{
                        bgcolor: "#ff0019",
                        width: "100%",
                        position: "relative",
                        overflow: { xs: "auto", sm: "initial" },
                        display: "flex",
                      }}
                    >
                      <ChartTabView />
                    </Box>
                  </Sheet>
                )}
                {colIndex === 0 && (
                  <Sheet
                    sx={{
                      bgcolor: "#5e030c",
                      borderRadius: "sm",
                      p: 1.5,
                      my: 1.5,
                      display: "flex",
                      gap: 2,
                      "& > div": { flex: 1 },
                    }}
                  >
                    <TrainingSearch></TrainingSearch>
                  </Sheet>
                )}
                <Sheet
                  sx={{
                    bgcolor: "#5e030c",
                    borderRadius: "sm",
                    p: 1.5,
                    my: 1.5,

                    gap: 2,
                    "& > div": { flex: 1 },
                  }}
                >
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <Box
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        sx={{
                          padding: 2,
                          border: "1px solid lightgrey",
                          borderRadius: 2,
                          backgroundColor: "#f7f7f7",
                          minHeight: "400px",
                        }}
                      >
                        <Sheet
                          sx={{
                            bgcolor: "#5e030c",
                            borderRadius: "sm",
                            p: 1.5,
                            my: 1.5,

                            gap: 2,
                            "& > div": { flex: 1 },
                          }}
                        >
                          <Typography variant="h6" color={"#f0e6e7"}>
                            {column.title}
                          </Typography>
                        </Sheet>

                        {cards.map((card, index) => (
                          <Draggable
                            key={card.id}
                            draggableId={card.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Box sx={{ margin: "8px 0" }}>
                                  <TrainingCard
                                    name={card.content.name}
                                    price={card.content.price}
                                    dtoContent={card.content.dtoContent}
                                    trainTerm={card.content.trainTerm}
                                    chipCartData={card.content.chipCartData}
                                    trainingId={card.content.trainingId}
                                  />
                                </Box>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </Sheet>
              </Grid>
            );
          })}
        </Grid>
      </DragDropContext>
    </>
  );
};

export default TrainingJoin;
