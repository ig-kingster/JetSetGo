import React from 'react';
import { motion } from 'framer-motion';
import Styles from './Testimonials.module.scss';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'John Doe',
    feedback: 'This service is amazing! Highly recommend to everyone.',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    rating: 5
  },
  {
    name: 'Jane Smith',
    feedback: 'A seamless and wonderful experience from start to finish.',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 4.5
  },
  {
    name: 'Robert Brown',
    feedback: 'Absolutely loved it! Will use again.',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    rating: 4.8
  }
];

const testimonialVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const Testimonials = () => {
  return (
    <div className={Styles.testimonials}>
      <h2 className={Styles.heading}>What Our Clients Say</h2>
      <div className={Styles.container}>
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className={Styles.card}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={testimonialVariants}
          >
            <div className={Styles.header}>
              <img src={testimonial.image} alt={testimonial.name} className={Styles.image} />
              <div className={Styles.details}>
                <h4 className={Styles.name}>{testimonial.name}</h4>
                <div className={Styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} color={i < Math.round(testimonial.rating) ? '#ffc107' : '#e4e5e9'} />
                  ))}
                </div>
              </div>
            </div>
            <p className={Styles.feedback}>&ldquo;{testimonial.feedback}&rdquo;</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
