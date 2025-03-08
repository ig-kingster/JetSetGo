import React, { useEffect, useState } from 'react';
import Styles from './Navbar.module.scss';
// import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { Link, useNavigate } from 'react-router-dom';
import { AccountCircle } from "@mui/icons-material";
import { IconButton, Badge, Menu, MenuItem, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { toast } from 'react-toastify';
const Navbar = () => {
  useEffect(() => {
    fetchDetails();
  }, []);
  

const [email, setEmail] = useState("")

const hid = sessionStorage.getItem("hid");

console.log(sessionStorage);

const fetchDetails = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/hotelemail/${hid}`);
    console.log(response.data);
  
    setEmail(response.data?.hotel_email)
    
if(response.data)
{
toast.success("Hotel Data Found");

}

    console.log("Hotel Data:", response.data); // Debugging

  } catch (error) {
    toast.error("Error fetching Hotel:");

  }
};



  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorNotifEl, setAnchorNotifEl] = useState(null);
  const [notifications, setNotifications] = useState([
    "New message from Admin",
    "Your package has been updated",
    "Reminder: Payment due tomorrow",
  ]);

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

  const handleNotiOpen = (event) => {
    setAnchorNotifEl(event.currentTarget);
  };

  const handleNotiClose = () => {
    setAnchorNotifEl(null);
  };

  return (
    <div className={Styles.main}>
      <div className={Styles.Container}>
        <div className={Styles.Image}>
          <img src="https://i.ibb.co/dJHmJmC4/jsg.png" className={Styles.logo} alt="Logo"/>
        </div>

        {/* Notification Section */}
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

        {/* User Profile Section */}
        <div className={Styles.user}>
          <Typography
            onClick={handleMenuOpen}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <AccountCircle style={{ marginRight: "5px" }} />
            {email}
          </Typography>

          {/* User Dropdown Menu */}
          <Menu 
            anchorEl={anchorEl} 
            open={Boolean(anchorEl)} 
            onClose={handleMenuClose} 
            disableAutoFocusItem 
          >
            <MenuItem disabled>HOTEL SUB MENU</MenuItem>
            <MenuItem onClick={() => { navigate("../profile"); handleMenuClose(); }} >Profile</MenuItem>
            <MenuItem onClick={() => { navigate("../settings"); handleMenuClose(); }}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
