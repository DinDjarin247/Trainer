import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import styles from "./CardImgSwiper.module.css";
import { EffectCreative } from "swiper/modules";

const CardImgSwiper = ({ trainingId }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/trainingShow/${trainingId}/images`
        );
        const data = await response.json();
        setImages(data.map((image) => image.imageUrl));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchImages();
  }, [trainingId]);

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
};

export default CardImgSwiper;
