import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, EffectFade , Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import 'swiper/css/navigation';


import React from "react";

export default function ProductSlider({
  dir,
  slides,
  classNamei,
  index,
  eff,
  spacee,
  firstnum,
  secondnum,
  lastnum,
  lastcol,
  val1,
  over1500,
}) {
  return (
    <>
      <Swiper
        direction={`${dir}`}
        slidesPerView={slides}
        spaceBetween={spacee}
        mousewheel={true}
        speed={1000}
        initialSlide={0}
        navigation={{
          enabled : false
        }}
      
      

        dir="rtl"
        loop={true}
        effect={`${eff}`}
        pagination={{
          clickable: true,
          dynamicBullets: val1,
          dynamicMainBullets: 2,
        }}
        breakpoints={{
          640: {
            slidesPerView: firstnum,
          },
          868: {
            slidesPerView: secondnum,
          },
          1024: {
            slidesPerView: lastnum,
          },
          1250: {
            slidesPerView: lastcol,
          },
          1500: {
            slidesPerView: over1500,
          },
        }}
        modules={[Mousewheel, Pagination, EffectFade ,Navigation]}
        className={`${classNamei}`}>
        {index}
      </Swiper>
    </>
  );
}
