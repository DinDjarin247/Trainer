import React from "react";
import ProfCard from "./ProfCard";
import { motion } from "framer-motion";
import "./Catalog.css";
const Catalog = ({ cards, avatar }) => {
  return (
    <div className="container">
      {cards.map((card, index) => (
        <div key={index} className="item">
          <motion.div
            className="box"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ProfCard
              title={card.title}
              subheader={card.subheader}
              image={card.image}
              content={card.content}
              date={card.date}
              avatar={avatar}
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default Catalog;
