import React, { useState } from 'react'
import './sidebar.scss'
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import InventoryIcon from '@mui/icons-material/Inventory';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import SellIcon from '@mui/icons-material/Sell';
// import QueryStatsIcon from '@mui/icons-material/QueryStats';
// import SystemSecurityUpdateIcon from '@mui/icons-material/SystemSecurityUpdate';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import SettingsIcon from '@mui/icons-material/Settings';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import LogoutIcon from '@mui/icons-material/Logout';
// import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Collapse from '@mui/material/Collapse';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
// import LocationCityIcon from '@mui/icons-material/LocationCity';
// import ApartmentIcon from '@mui/icons-material/Apartment';
// import VillaIcon from '@mui/icons-material/Villa';

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SellIcon from "@mui/icons-material/Sell";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import PublicIcon from "@mui/icons-material/Public";
import MapIcon from "@mui/icons-material/Map";
import LandscapeIcon from "@mui/icons-material/Landscape";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { 
    List, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    Collapse 
  } from "@mui/material";
import { Link } from 'react-router-dom';
  
const Sidebar = () => {

    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };


    return (
        <div className='Sidebar'>
        <div className="center">
          <ul>
            <p className="title">Navigate</p>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
            
            <p className="title">Management</p>
            <li>
              <AccountCircleIcon className="icon" />
              <Link to="../users" className="links">

              <span>Customers</span>
              </Link>
            </li>
            <li>
              <InventoryIcon className="icon" />
              <Link to="/admin/application" className="links">
              <span>Applications</span></Link>
            </li>
            <li>
              <LocalShippingIcon className="icon" />
              <span>Transportation</span>
            </li>
            <li>
              <SellIcon className="icon" />
              <span>Bookings</span>
            </li>
  
            <List>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <AddLocationAltIcon className="icon" />
                </ListItemIcon>
                <ListItemText primary="Destinations" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto">
                <List component="div" disablePadding>
                  <Link to="/admin/state">
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <PublicIcon className="icon" />
                      </ListItemIcon>
                      <ListItemText primary="State" />
                    </ListItemButton>
                  </Link>
                  <Link to="/admin/district">
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <MapIcon className="icon" />
                      </ListItemIcon>
                      <ListItemText primary="District" />
                    </ListItemButton>
                  </Link>
                  <Link to="/admin/place">
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <LandscapeIcon className="icon" />
                      </ListItemIcon>
                      <ListItemText primary="Place" />
                    </ListItemButton>
                  </Link>
                </List>
              </Collapse>
            </List>
  
            <p className="title">Insights</p>
            <li>
              <QueryStatsIcon className="icon" />
              <span>Analytics</span>
            </li>
            <li>
              <AssessmentIcon className="icon" />
              <span>Reports</span>
            </li>
  
            <p className="title">Preferences</p>
            <li>
              <SettingsIcon className="icon" />
              <span>Settings</span>
            </li>
            <li>
              <LogoutIcon className="icon" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
        
        <div className="bottom">
          <div className="colorOptions" style={{background: '#1a365d'}}></div>
          <div className="colorOptions" style={{background: '#0e7c7b'}}></div>
        </div>
      </div>
    )
}

export default Sidebar