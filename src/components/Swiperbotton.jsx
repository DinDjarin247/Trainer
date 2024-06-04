import React from "react";
const images = [
  "/mainBottomGallry/bottom (1).jpg",
  "/mainBottomGallry/bottom (2).jpg",
  "/mainBottomGallry/bottom (3).jpg",
  "/mainBottomGallry/bottom (4).jpg",
  "/mainBottomGallry/bottom (5).jpg",
  "/mainBottomGallry/bottom (6).jpg",
  "/mainBottomGallry/bottom (7).jpg",
  "/mainBottomGallry/bottom (8).jpg",
  "/mainBottomGallry/bottom (9).jpg",
  "/mainBottomGallry/bottom (10).jpg",
  "/mainBottomGallry/bottom (11).jpg",
  "/mainBottomGallry/bottom (12).jpg",
  "/mainBottomGallry/bottom (13).jpg",
  "/mainBottomGallry/bottom (14).jpg",
  "/mainBottomGallry/bottom (15).jpg",
  "/mainBottomGallry/bottom (16).jpg",
  "/mainBottomGallry/bottom (17).jpg",
  "/mainBottomGallry/bottom (18).jpg",
  "/mainBottomGallry/bottom (19).jpg",
  "/mainBottomGallry/bottom (20).jpg",
  "/mainBottomGallry/bottom (21).jpg",
  "/mainBottomGallry/bottom (22).jpg",
  "/mainBottomGallry/bottom (23).jpg",
  "/mainBottomGallry/bottom (24).jpg",
  "/mainBottomGallry/bottom (25).jpg",
  "/mainBottomGallry/bottom (26).webp",
  "/mainBottomGallry/bottom (27).webp",
  "/mainBottomGallry/bottom (28).webp",
];
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";

import styles from "./Swiperbottom.module.css";

// import required modules
import { EffectCreative } from "swiper/modules";

export default function Swiperbottom() {
  return (
    <div className={styles.body}>
      <Swiper
        className={styles.swiper}
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-120%", 0, -500],
          },
          next: {
            shadow: true,
            translate: ["120%", 0, -500],
          },
        }}
        modules={[EffectCreative]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className={styles.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
