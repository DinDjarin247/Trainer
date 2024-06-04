import { useEffect, useState } from "react";

import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";

import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import CardImgSwiper from "./CardImgSwiper";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Sheet from "@mui/joy/Sheet";

import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import { Button, ListItem } from "@mui/joy";

const TrainingCard = ({
  name,
  price,
  dtoContent,
  trainTerm,
  chipCartData,
  trainingId,
}) => {
  console.log(
    { name, price, dtoContent, trainTerm, chipCartData, trainingId },
    "PT생성"
  );

  const [open, setOpen] = useState(false);
  const [ptTags, stPtTags] = useState([]);

  useEffect(() => {
    const fetchTraningTags = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/trainingShow/${trainingId}/tags`
        );
        const data = await response.json();
        stPtTags(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTraningTags();
  }, [trainingId]);

  return (
    <>
      <Box sx={{ minHeight: 350 }}>
        <Card
          variant="outlined"
          sx={(theme) => ({
            width: 300,
            gridColumn: "span 2",
            flexDirection: "row",
            flexWrap: "wrap",
            resize: "horizontal",
            overflow: "hidden",
            gap: "clamp(0px, (100% - 360px + 32px) * 999, 16px)",
            transition: "transform 0.3s, border 0.3s",
            "&:hover": {
              borderColor: theme.vars.palette.primary.outlinedHoverBorder,
              transform: "translateY(-2px)",
            },
            "& > *": { minWidth: "clamp(0px, (360px - 100%) * 999,100%)" },
          })}
        >
          <AspectRatio
            variant="soft"
            sx={{
              flexGrow: 1,
              display: "contents",
              "--AspectRatio-paddingBottom":
                "clamp(0px, (100% - 360px) * 999, min(calc(100% / (16 / 9)), 300px))",
            }}
          ></AspectRatio>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: 200,
            }}
          >
            <Box sx={{ display: "flex" }}>
              <div>
                <Typography level="title-lg">
                  <Link
                    href="#container-responsive"
                    overlay
                    underline="none"
                    sx={{
                      color: "text.primary",
                      "&.Mui-focusVisible:after": { outlineOffset: "-4px" },
                    }}
                  >
                    {name}
                  </Link>
                </Typography>
                <Typography level="body-sm">{price}</Typography>
              </div>
            </Box>
            <CardImgSwiper trainingId={trainingId} />
            <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
              <Avatar variant="soft" color="neutral">
                Y
              </Avatar>
              <div>
                <Typography level="body-xs">{dtoContent}</Typography>
                <Typography level="body-sm">{trainTerm}</Typography>
              </div>
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
                      {ptTags.map((tag) => (
                        <ListItem key={tag.tagId}>
                          <Chip label={tag.label} />
                        </ListItem>
                      ))}
                    </Paper>
                  </Box>
                </Sheet>
              </Modal>
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  );
};
export default TrainingCard;
