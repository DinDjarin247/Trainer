// components/Home.js
import React from "react";
import SwiperTest from "./SwiperTest";
import SwiperMid from "./SwiperMid";

import Swiperbottom from "./Swiperbotton";

const Home = () => {
  return (
    <>
      <SwiperTest />
      <div className="divider">00000</div>
      <SwiperMid />
      <div className="divider">00000</div>
      <Swiperbottom />
      <div className="divider">00000</div>
    </>
  );
};

export default Home;
