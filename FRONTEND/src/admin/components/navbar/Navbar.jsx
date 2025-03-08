import React, { useContext } from 'react';
// import { MyTheme } from '../../context/ThemeContext';
// import { ReactComponent as CompassIcon } from './compass.svg'; // Add travel-themed SVG
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ListIcon from '@mui/icons-material/List';
import LightModeIcon from '@mui/icons-material/LightMode';
import './navbar.scss';

const Navbar = () => {

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="logo">
          <img src='https://i.ibb.co/dJHmJmC4/jsg.png' />
          {/* <span>Wanderlust</span> */}
        </div>

        <div className="search">
          <input type="text" placeholder="Search destinations, packages..." />
          <SearchIcon className="icon" />
        </div>

        <div className="items">
          <div className="item">
            <LanguageIcon className="icon" />
            <span>English</span>
          </div>
          
          <div className="item">
            {/* setCheck */}
            {/* <button onClick={() => ((prev) => !prev)}>
              {check ? (
                <LightModeIcon className="icon" />
              ) : (
                <DarkModeIcon className="icon" />
              )}
            </button> */}
          </div>

          <div className="item">
            <FullscreenExitIcon className="icon" />
          </div>

          <div className="item">
            <NotificationsIcon className="icon" />
            <div className="counter">3</div>
          </div>

          <div className="item">
            <ChatBubbleOutlineIcon className="icon" />
            <div className="counter">2</div>
          </div>

          <div className="item">
            <ListIcon className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;