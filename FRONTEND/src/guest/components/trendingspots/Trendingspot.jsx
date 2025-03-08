import React from 'react';
import { motion } from 'framer-motion';
import Styles from './Trendingspot.module.scss';

const spotVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Trendingspot = () => {
  return (
    <div className={Styles.trendings}>
      <div className={Styles.heads}>
        <span className={Styles.head}>Trending </span>
        <span> Spots</span>
      </div>
      <div className={Styles.trending}>
        <div className={Styles.spots}>
          <motion.div 
            className={Styles.spot} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className={Styles.names}>
              {[
                { title: 'Europe', img: 'https://images.emtcontent.com/holiday-img/home-img/europe-tpt.webp' },
                { title: 'Andaman', img: 'https://images.emtcontent.com/holiday-img/home-img/andaman-handpckd.webp' },
                { title: 'Bali', img: 'https://images.emtcontent.com/holiday-img/home-img/bali-qckv.webp' },
                { title: 'Japan', img: 'https://images.emtcontent.com/holiday-img/home-img/japan.webp' },
              ].map((spot, index) => (
                <motion.div key={index} className={Styles.name} variants={spotVariants}>
                  <div className={Styles.shadow}></div>
                  <img src={spot.img} className={Styles.spotimg} alt={spot.title} />
                  <span className={Styles.title}>{spot.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Trendingspot;
