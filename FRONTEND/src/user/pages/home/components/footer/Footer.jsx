import React from 'react';
import Styles from './Footer.module.scss';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <footer className={Styles.Container}>
      {/* Top Section */}
      <div className={Styles.items}>
        {/* Quick Links */}
        <div className={Styles.item}>
          <h4 className={Styles.heading}>Quick Links</h4>
          <ul>
            <li className={Styles.itm}><ArrowForwardIosIcon /> About</li>
            <li className={Styles.itm}><ArrowForwardIosIcon /> Services</li>
            <li className={Styles.itm}><ArrowForwardIosIcon /> Travel</li>
            <li className={Styles.itm}><ArrowForwardIosIcon /> Packages</li>
            <li className={Styles.itm}><ArrowForwardIosIcon /> Hotels</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className={Styles.contact}>
          <h4 className={Styles.heading}>Contact Us</h4>
          <p>Email: support@easemytrip.com</p>
          <p>Phone: +91-9876543210</p>
          <p>Address: 123 Travel Lane, Wanderlust City, India</p>
        </div>

        {/* Social Media */}
        <div className={Styles.socials}>
          <h4 className={Styles.heading}>Follow Us</h4>
          <div className={Styles.social}>
            <InstagramIcon className={Styles.icon} />
            <FacebookIcon className={Styles.icon} />
            <TwitterIcon className={Styles.icon} />
            <YouTubeIcon className={Styles.icon} />
            <XIcon className={Styles.icon} />
          </div>
        </div>
      </div>

      <hr className={Styles.divider} />

      {/* Bottom Section */}
      <div className={Styles.bottom}>
        {/* About */}
        <div className={Styles.text}>
          <h4>About EaseMyTrip</h4>
          <p>
            EaseMyTrip offers 'End to End' travel solutions, including air tickets for more than 400 international 
            and domestic airlines, hotel bookings for nearly 1 million hotels in India and abroad, cab booking with 
            4000+ cab operators, and bus tickets with 2000+ operators.
          </p>
        </div>

        {/* App Downloads */}
        <div className={Styles.download}>
          <h4>Download Our App</h4>
          <div className={Styles.img}>
            <img
              className={Styles.icon}
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png"
              alt="Download Android App"
            />
            <img
              className={Styles.icon}
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png"
              alt="Download iOS App"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
