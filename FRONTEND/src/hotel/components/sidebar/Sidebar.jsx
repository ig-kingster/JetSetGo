import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Styles from './Sidebar.module.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HotelIcon from '@mui/icons-material/Hotel';
import TourIcon from '@mui/icons-material/Tour';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PackageIcon from '@mui/icons-material/LocalShipping'; // Icon for packages
import GuideIcon from '@mui/icons-material/PeopleAlt'; // Icon for guides
import ViewPackageIcon from '@mui/icons-material/Visibility'; // Icon for view packages
import BookingIcon from '@mui/icons-material/Book'; 

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

 

  return (
    <div className={`${Styles.sidebar} ${isExpanded ? Styles.expanded : Styles.collapsed}`}>
      <div className={Styles.sidebarHeader}>
        <div className={Styles.profile}>
          {isExpanded && <span className={Styles.profileName}> JetSetGo</span>}
        </div>
        <button className={Styles.toggleButton} onClick={toggleSidebar}>
          {isExpanded ? '←' : '→'}
        </button>
      </div>
      <ul className={Styles.menu}>
        <li>
          <Link to="/hotel" className={`${Styles.menuItem} ${Styles.active}`}>
            <DashboardIcon /> {isExpanded && 'Dashboard'}
          </Link>
        </li>
        <li>
          <Link to="../managehotel" className={Styles.menuItem}>
            <HotelIcon /> {isExpanded && 'Manage Hotel'}
          </Link>
        </li>
        <li>
        <Link to="../packageadd" className={Styles.menuItem}>
                 <TourIcon/>  {isExpanded && 'Add Package'}
                </Link>
        </li>
        <li>
        <Link to="../packages" className={Styles.menuItem}>
                <ViewPackageIcon/>  {isExpanded && 'View Packages'}
                </Link>
        </li>
       
        <li>
          <Link to="../guides" className={Styles.menuItem}>
            <GuideIcon /> {isExpanded && 'Guides'}
          </Link>
        </li>
        <li>
          <Link to="../bookings" className={Styles.menuItem}>
            <BookingIcon /> {isExpanded && 'Bookings'}
          </Link>
        </li>
        <li>
          <Link to="../addguide" className={Styles.menuItem}>
            <PersonAddIcon /> {isExpanded && 'Add Guide'}
          </Link>
        </li>
        <li>
          <Link to="../logout" className={Styles.menuItem}>
            <ExitToAppIcon /> {isExpanded && 'Logout'}
          </Link>
        </li>
      </ul>
      
    </div>
  );
};

export default Sidebar;
