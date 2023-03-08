import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../styles/slide.css";
import {data} from "./data";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function App() {
  return (
    <div className="suggestion-set">
        <h1>Suggestions for you</h1>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >{data.map((data) =>(
        <SwiperSlide className="main-card">
            <div className="set"><h5>{data.name}</h5>
            <p>{data.description}</p>
            <button>Read More</button></div>
        </SwiperSlide>
      ))}
      </Swiper>
    </div>
  );
}