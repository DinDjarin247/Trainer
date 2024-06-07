import React, { useState } from "react";
import { initialTabs as tabs } from "./ingredients";
import { motion, AnimatePresence } from "framer-motion";

export default function ChartTabView() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const windowStyle = {
    width: "100%",
    height: "360px",
    borderRadius: "10px",
    background: "white",
    overflow: "hidden",
    boxShadow:
      "0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075)",
    display: "flex",
    flexDirection: "column",
  };

  const navStyle = {
    background: "#fdfdfd",
    padding: "5px 5px 0",
    borderRadius: "10px",
    borderBottomLeftRadius: "0",
    borderBottomRightRadius: "0",
    borderBottom: "1px solid #eeeeee",
    height: "44px",
  };

  const tabsStyle = {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexWrap: "nowrap",
    width: "100%",
    height: "30px",
  };

  const mainStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "128px",
    flexGrow: 1,
    userSelect: "none",
  };

  const liStyle = {
    listStyle: "none",
    padding: "0",
    margin: "0",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "500",
    fontSize: "20px",
    borderRadius: "5px",
    borderBottomLeftRadius: "0",
    borderBottomRightRadius: "0",
    width: "100%",
    position: "relative",
    background: "white",
    cursor: "pointer",
    height: "24px",
    display: "flex",
    justifyContent: "center", // 텍스트를 가운데 정렬
    // justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    minWidth: 0,
    userSelect: "none",
  };

  const underlineStyle = {
    position: "absolute",
    bottom: "-1px",
    left: "0",
    right: "0",
    height: "1px",
    background: "var(--accent)",
  };

  const selectedStyle = {
    background: "#eee",
  };

  const hoverVariant = {
    hover: {
      y: -10, // 위로 살짝 튀어오르는 애니메이션
    },
  };

  return (
    <div style={windowStyle}>
      <nav style={navStyle}>
        <ul style={tabsStyle}>
          {tabs.map((item) => (
            <motion.li
              key={item.label}
              variants={hoverVariant}
              whileHover="hover"
              style={{
                ...liStyle,
                ...(item === selectedTab ? selectedStyle : {}),
              }}
              onClick={() => setSelectedTab(item)}
            >
              {`${item.icon} ${item.label}`}
              {item === selectedTab ? (
                <motion.div style={underlineStyle} layoutId="underline" />
              ) : null}
            </motion.li>
          ))}
        </ul>
      </nav>
      <main style={mainStyle}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab ? selectedTab.icon : "😋"}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
