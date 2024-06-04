import * as React from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";

import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleListItemClick = (text) => {
    if (text === "사람들") {
      navigate("/profindex");
    }
    if (text === "유치부") {
      navigate("/kindergarden");
    }
    if (text === "초등 저학년") {
      navigate("/ElementLow");
    }
    if (text === "초등 고학년") {
      navigate("/ElementHigh");
    }
    if (text === "트레이닝") {
      navigate("/TrainingIndex");
    }
    if (text === "search") {
      navigate("/search");
    }
  };
  const handleClickHome = () => {
    navigate("/");
  };

  const list = (anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["somthing", "Starred", "Send email", "트레이닝"].map((text) => (
          <ListItem key={text}>
            <ListItemButton onClick={() => handleListItemClick(text)}>
              {text}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["사람들", "Trash", "Spam"].map((text) => (
          <ListItem key={text}>
            <ListItemButton onClick={() => handleListItemClick(text)}>
              {text}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const listTop = (anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["유치부", "초등 저학년", "초등 고학년", "성인 미술"].map((text) => (
          <ListItem key={text}>
            <ListItemButton onClick={() => handleListItemClick(text)}>
              {text}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/daisyui@4.11.1/dist/full.min.css"
        rel="stylesheet"
        type="text/css"
      />
      <script src="https://cdn.tailwindcss.com"></script>
      <div
        className="navbar"
        style={{
          background:
            "linear-gradient(45deg, #8B0000 0%, #A52A2A 25%, #B22222 50%, #800000 75%, #660000 100%)",
        }}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
              onClick={toggleDrawer("left", true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <React.Fragment>
              <Drawer
                anchor="left"
                open={state.left}
                onClose={toggleDrawer("left", false)}
              >
                {list("left")}
              </Drawer>
            </React.Fragment>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl" onClick={handleClickHome}>
            GymFIt
          </a>
        </div>
        <div className="navbar-end">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => handleListItemClick("search")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
          <React.Fragment>
            <Button variant="outlined" onClick={toggleDrawer("top", true)}>
              Program
            </Button>
            <Drawer
              anchor="top"
              open={state.top}
              onClose={toggleDrawer("top", false)}
            >
              {listTop("top")}
            </Drawer>
          </React.Fragment>
        </div>
      </div>
    </>
  );
};

export default Header;
