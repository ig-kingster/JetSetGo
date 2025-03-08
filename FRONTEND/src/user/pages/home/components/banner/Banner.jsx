import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Styles from "./Banner.module.scss";

const Banner = () => {
  const topImages = [
    "https://platforms.makemytrip.com/contents/2a381830-3353-4cc6-8e7d-beed2eb44d85",
    "https://platforms.makemytrip.com/contents/6e46e0e9-f2d1-4f66-aa6f-dbeb2d051cfe",
    "https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/phonixImages/SouthIndia-1200x320-20Feb.jpg"
  ];

  return (
    <div className={Styles.container}>
      {/* Carousel for Top Image */}
      <div className={Styles.top}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className={Styles.carousel}
        >
          {topImages.map((img, index) => (
            <SwiperSlide key={index} className={Styles.slide}>
              <img src={img} alt={`slide-${index}`} className={Styles.img} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Animated Bottom Images with Reveal Effect */}
      <div className={Styles.bottom}>
        <motion.div
          className={Styles.bottomimg}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img
            src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fHRyYXZlbHxlbnwwfDB8MHx8fDA%3D"
            alt=""
            className={Styles.imgs}
          /> 
          <img
            src="https://www.indianholiday.com/pictures/country_banner/asia-33.jpeg"
            alt=""
            className={Styles.imgs}
          />
          <img
            src="https://media.istockphoto.com/id/1267099166/photo/backpacker-on-top-of-a-mountain-enjoying-valley-view.jpg?s=2048x2048&w=is&k=20&c=U9IJCUdTcb2ecjh4E6qsDI_OCQDt-eQI0deXks0oRD4="
            alt=""
            className={Styles.imgs}
          />
          <img
            src="https://media.istockphoto.com/id/1476751868/photo/couple-spending-leisure-time-at-ancient-site.jpg?s=2048x2048&w=is&k=20&c=l9hRLOZrcMU5-OUKwhRBVFit74cMe6JEXxUfopwXe88="
            alt=""
            className={Styles.imgs}
          />
            <img
            src="https://cdn.pixabay.com/photo/2023/10/11/13/41/ship-8308680_1280.jpg"
            alt=""
            className={Styles.imgs}
          />
               <img
            src="https://cdn.pixabay.com/photo/2020/09/17/05/12/river-5578051_1280.jpg"
            alt=""
            className={Styles.imgs}
          />
               <img
            src="https://cdn.pixabay.com/photo/2021/12/03/20/59/town-6843799_1280.jpg"
            alt=""
            className={Styles.imgs}
          />
                <img
            src="https://cdn.pixabay.com/photo/2016/11/23/18/38/woman-1854284_1280.jpg"
            alt=""
            className={Styles.imgs}
          />
                <img
            src="https://cdn.pixabay.com/photo/2018/07/23/18/59/barefoot-3557605_1280.jpg"
            alt=""
            className={Styles.imgs}
          />
                <img
            src="https://cdn.pixabay.com/photo/2014/07/31/22/50/photographer-407068_1280.jpg"
            alt=""
            className={Styles.imgs}
          />
                <img
            src="https://cdn.pixabay.com/photo/2017/12/16/22/22/bora-bora-3023437_1280.jpg"
            alt=""
            className={Styles.imgs}
          />
                <img
            src="https://cdn.pixabay.com/photo/2022/02/15/22/10/town-7015699_1280.jpg"
            alt=""
            className={Styles.imgs}
          />
                <img
            src="https://cdn.pixabay.com/photo/2019/11/23/03/08/valley-4646114_1280.jpg"
            alt=""
            className={Styles.imgs}
          />
                {/* <img
            src=""
            alt=""
            className={Styles.imgs}
          />
                <img
            src=""
            alt=""
            className={Styles.imgs}
          />
                <img
            src=""
            alt=""
            className={Styles.imgs}
          />
                <img
            src=""
            alt=""
            className={Styles.imgs}
          />
                <img
            src=""
            alt=""
            className={Styles.imgs}
          />
                <img
            src=""
            alt=""
            className={Styles.imgs}
          />
                <img
            src=""
            alt=""
            className={Styles.imgs}
          />
                <img
            src=""
            alt=""
            className={Styles.imgs}
          />
                <img
            src=""
            alt=""
            className={Styles.imgs}
          />
                <img
            src=""
            alt=""
            className={Styles.imgs}
          />
                <img
            src=""
            alt=""
            className={Styles.imgs}
          /> */}
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
