import React, { useEffect, useState } from 'react';
import Styles from './Navbar.module.scss';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { Link, useNavigate } from 'react-router-dom';
import { AccountCircle } from "@mui/icons-material";
import { IconButton, Badge, Menu, MenuItem, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
 
useEffect(() => {
  fetchDetails();
}, []);

const [email, setEmail] = useState("")

const uid = sessionStorage.getItem("uid");
const fetchDetails = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/useremail/${uid}`);
    console.log(response.data);
  
    setEmail(response.data?.user_email)
    
if(response.data)
{
toast.success("User Data Found");

}

    console.log("User Data:", response.data); // Debugging

  } catch (error) {
    toast.error("Error fetching user:");

  }
};
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // const [anchorNotifEl, setAnchorNotifEl] = useState(null);
  // const [notifications, setNotifications] = useState([
  //   "New message from Admin",
  //   "Your package has been updated",
  //   "Reminder: Payment due tomorrow",
  // ]);
  // const handleNotiOpen = (event) => {
  //   setAnchorNotifEl(event.currentTarget);
  // };

  // const handleNotiClose = () => {
  //   setAnchorNotifEl(null);
  // };


  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    "New message from Admin",
    "Your package has been updated",
    "Reminder: Payment due tomorrow",
  ]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };


  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`../search?result=${encodeURIComponent(searchQuery)}`);
    }
  };

  
  return (
    <div className={Styles.Container}>
      <div className={Styles.Image}>
        <img src="https://i.ibb.co/dJHmJmC4/jsg.png" className={Styles.logo} alt="Logo"/>
      </div>

      <div className={Styles.search}>
        <button className={Styles.btn}>
            <SearchSharpIcon />
        </button>
        <div className={Styles.search}>
        <input
          type="text"
          className={Styles.txt}
          placeholder="Search your destination"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Enter key triggers search
        />
       
      </div>
      </div>



{/* Notification Section
<div className={Styles.notificationContainer}>
          <IconButton color="inherit" onClick={handleNotiOpen}>
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={anchorNotifEl}
            open={Boolean(anchorNotifEl)}
            onClose={handleNotiClose}
            keepMounted
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <MenuItem key={index} onClick={handleNotiClose}>
                  <Typography variant="body2">{notification}</Typography>
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>
                <Typography variant="body2">No new notifications</Typography>
              </MenuItem>
            )}
          </Menu>
        </div>
 */}

 


 {/* Notification Button */}
      <div className={Styles.notificationContainer}>
        <IconButton color="inherit" onClick={toggleNotifications}>
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </div>

     {/* Animated Notifications (Bottom to Top) */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            className={Styles.notificationsWrapper}
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 200 }}
            transition={{ duration: 0.5 }}
          >
            {notifications.map((notification, index) => (
              <motion.div
                key={index}
                className={Styles.notificationItem}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {notification}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Profile Section */}
      <div className={Styles.user} 
       >
        {/* Clickable Email */}
        <Typography
          onClick={handleMenuOpen}
          style={{ display: "flex", alignItems: "center", cursor: "pointer", }}
        >
          <AccountCircle style={{ marginRight: "5px" }} />
          {email}
        </Typography>

        {/* Dropdown Menu */}
        <Menu 
          anchorEl={anchorEl} 
          open={Boolean(anchorEl)} 
          onClose={handleMenuClose} 
          disableAutoFocusItem 
        >
          <MenuItem disabled >USER SUB MENU</MenuItem>
          <MenuItem onClick={() => { navigate("/user"); handleMenuClose(); }} >Home</MenuItem>

          <MenuItem onClick={() => { navigate("../profile"); handleMenuClose(); }} >Profile</MenuItem>
          <MenuItem onClick={() => { navigate("../settings"); handleMenuClose(); }}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
