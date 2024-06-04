import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import { styled } from "@mui/material/styles";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Sheet from "@mui/joy/Sheet";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButton } from "@mui/material";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));
const ProfPage = ({
  name,
  age,
  image,
  content,
  classStartDate,
  chipCartData,
  personId, // personId 추가
}) => {
  console.log(
    { name, age, image, content, classStartDate, personId },
    "결과페이지"
  );
  const [open, setOpen] = React.useState(false);
  const [personTags, setPersonTags] = React.useState([]);
  //==
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchPersonTags = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/persons/${personId}/tags`
        );
        const data = await response.json();
        setPersonTags(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPersonTags();
  }, [personId]);

  const handleGoGalleryClick = () => {
    navigate("/gallery", {
      state: {
        name,
        age,
        image,
        content,
        classStartDate,
        chipCartData,
        personId,
      }, // personId 전달
    });
  };
  const handleGoProfUpdate = () => {
    navigate("/ProfUpdate", {
      state: {
        personId,
      }, // personId 전달
    });
    console.log(personId, "go update");
  };
  return (
    <Box
      sx={{
        bgcolor: "#ecef58",
        width: "100%",
        position: "relative",
        overflow: { xs: "auto", sm: "initial" },
        display: "flex",
      }}
    >
      {/* <Box
        sx={{
          position: "absolute",
          display: "block",
          width: "1px",
          bgcolor: "warning.300",
          left: "100px",
          top: "-24px",
          bottom: "-24px",
          "&::before": {
            top: "4px",
            content: '"vertical"',
            display: "block",
            position: "absolute",
            right: "0.5rem",
            color: "text.tertiary",
            fontSize: "sm",
            fontWeight: "lg",
          },
          "&::after": {
            top: "4px",
            content: '"horizontal"',
            display: "block",
            position: "absolute",
            left: "0.5rem",
            color: "text.tertiary",
            fontSize: "sm",
            fontWeight: "lg",
          },
        }}
      /> */}
      <Card
        orientation="horizontal"
        sx={{
          bgcolor: "#ffffff",
          width: "100%",
          flexWrap: "wrap",
          [`& > *`]: {
            "--stack-point": "500px",
            minWidth:
              "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
          },
          // make the card resizable for demo
          overflow: "auto",
          resize: "horizontal",
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <img src={image} loading="lazy" alt="" />
        </AspectRatio>
        <CardContent>
          <Typography fontSize="xl" fontWeight="lg">
            이름: {name}
          </Typography>
          <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
            나이: {age}
          </Typography>
          <IconButton onClick={handleGoProfUpdate}>프로필 수정</IconButton>
          <Sheet
            sx={{
              bgcolor: "#78a6e7",
              borderRadius: "sm",
              p: 1.5,
              my: 1.5,
              display: "flex",
              gap: 2,
              "& > div": { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" fontWeight="lg">
                등록일
              </Typography>
              <Typography fontWeight="lg">{classStartDate}</Typography>
            </div>
            <div>
              <Accordion sx={{ width: "100%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  <Typography level="body-xs" fontWeight="lg">
                    세부사항
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography fontWeight="lg">{content}</Typography>
                </AccordionDetails>
                <AccordionActions>
                  <Button variant="outlined">Cancel</Button>
                  <Button variant="outlined">Agree</Button>
                </AccordionActions>
              </Accordion>
            </div>
          </Sheet>
          <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
            <Button
              variant="outlined"
              color="neutral"
              onClick={handleGoGalleryClick}
            >
              Gallery
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setOpen(true)}
            >
              수강
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setOpen(true)}
            >
              TAG
            </Button>
            <Modal
              aria-labelledby="modal-title"
              aria-describedby="modal-desc"
              open={open}
              onClose={() => setOpen(false)}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Sheet
                variant="outlined"
                sx={{
                  maxWidth: 500,
                  borderRadius: "md",
                  p: 3,
                  boxShadow: "lg",
                }}
              >
                <ModalClose variant="plain" sx={{ m: 1 }} />
                <Typography
                  component="h2"
                  id="modal-title"
                  level="h4"
                  textColor="inherit"
                  fontWeight="lg"
                  mb={1}
                >
                  TAG
                </Typography>
                <Box
                  component="section"
                  sx={{ p: 2, border: "1px dashed grey" }}
                >
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
                    component="ul"
                  >
                    {personTags.map((tag) => (
                      <ListItem key={tag.tagId}>
                        <Chip label={tag.label} />
                      </ListItem>
                    ))}
                  </Paper>
                </Box>
              </Sheet>
            </Modal>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfPage;
