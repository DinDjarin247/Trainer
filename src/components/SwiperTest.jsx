import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import img1 from "@/assets/002.png";
import img2 from "@/assets/003.png";
import img3 from "@/assets/004.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./SwiperTest.module.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function SwiperTest() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper
        className={styles.swiper}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        // className="mySwiper"
      >
        <SwiperSlide className={styles.swiperSlide}>
          <img src={img1} alt="" />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img src={img2} alt="" />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img src={img3} alt="" />
        </SwiperSlide>
        <div className={styles.autoplayProgress} slot="container-end">
          <svg
            className={styles.autoplayProgressSvg}
            viewBox="0 0 48 48"
            ref={progressCircle}
          >
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}
