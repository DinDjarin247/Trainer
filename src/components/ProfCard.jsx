import * as React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import AspectRatio from "@mui/joy/AspectRatio";
import Input from "@mui/joy/Input";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import Face from "@mui/icons-material/Face";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sheet } from "@mui/joy";
function useParallax(value, distance) {
  return useTransform(value, [0, 1], ["-" + distance, distance]);
}

const ease = [0.08, 0.37, 0.45, 0.89];

const ProfCard = ({ title, subheader, image, content, date, avatar }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 300,
        "--Card-radius": (theme) => theme.vars.radius.xs,
      }}
    >
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", gap: 1 }}
      >
        <Box
          sx={{
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              m: "-2px",
              borderRadius: "50%",
              background:
                "linear-gradient(45deg, #33baf0 0%, #3c9de6 25%, #4379dc 50%, #4666cc 75%, #4866bc 100%)",
            },
          }}
        >
          <Sheet
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "2px solid",
              overflow: "hidden", // This ensures that the image does not overflow out of the circle
            }}
          >
            <img
              src={avatar}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Ensures the image covers the circle area without distortion
              }}
            />
          </Sheet>
        </Box>
        <Typography fontWeight="lg">{title}</Typography>
        <IconButton
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ ml: "auto" }}
        >
          <MoreHoriz />
        </IconButton>
      </CardContent>
      <CardOverflow>
        <AspectRatio>
          <img src={image} alt={title} loading="lazy" />
        </AspectRatio>
      </CardOverflow>
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", mx: -1 }}
      >
        <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
          <IconButton variant="plain" color="neutral" size="sm">
            <FavoriteBorder />
          </IconButton>
          <IconButton variant="plain" color="neutral" size="sm">
            <ModeCommentOutlined />
          </IconButton>
          <IconButton variant="plain" color="neutral" size="sm">
            <SendOutlined />
          </IconButton>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 0.5, mx: "auto" }}
        >
          {[...Array(5)].map((_, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: "50%",
                width: `max(${6 - index}px, 3px)`,
                height: `max(${6 - index}px, 3px)`,
                bgcolor: index === 0 ? "primary.solidBg" : "background.level3",
              }}
            />
          ))}
        </Box>
        <Box sx={{ width: 0, display: "flex", flexDirection: "row-reverse" }}>
          <IconButton variant="plain" color="neutral" size="sm">
            <BookmarkBorderRoundedIcon />
          </IconButton>
        </Box>
      </CardContent>
      <CardContent>
        <Link
          component="button"
          underline="none"
          fontSize="sm"
          fontWeight="lg"
          textColor="text.primary"
        >
          8.1M Likes
        </Link>
        <Typography fontSize="sm">
          <Link
            component="button"
            color="neutral"
            fontWeight="lg"
            textColor="text.primary"
          >
            {title}
          </Link>{" "}
          {content}
        </Typography>
        <Link
          component="button"
          underline="none"
          fontSize="sm"
          startDecorator="…"
          sx={{ color: "text.tertiary" }}
        >
          more
        </Link>
        <Link
          component="button"
          underline="none"
          fontSize="10px"
          sx={{ color: "text.tertiary", my: 0.5 }}
        >
          {date}
        </Link>
      </CardContent>
      <CardContent orientation="horizontal" sx={{ gap: 1 }}>
        <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
          <Face />
        </IconButton>
        <Input
          variant="plain"
          size="sm"
          placeholder="Add a comment…"
          sx={{ flex: 1, px: 0, "--Input-focusedThickness": "0px" }}
        />
        <Link disabled underline="none" role="button">
          Post
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProfCard;
