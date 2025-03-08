import React, { useEffect, useState } from 'react'
import Styles from './Sidebar.module.scss'
import PersonIcon from '@mui/icons-material/Person';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import HailIcon from '@mui/icons-material/Hail';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Sidebar = () => {


useEffect(() => {
    fetchDetails();
  }, []);

  const [name, setName] = useState("")
  
  const uid = sessionStorage.getItem("uid");
  const fetchDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/username/${uid}`);
      console.log(response.data);
    
      setName(response.data?.user_name)
      
if(response.data)
{
  toast.success("User Data Found");

}

      console.log("User Data:", response.data); // Debugging

    } catch (error) {
      console.error("Error fetching states:", error);
      toast.error("Error fetching states:");

    }
  };
    return (

        <div className={Styles.main}>
            <div className={Styles.side}>
                <div className={Styles.elements}>
                

                <div className={Styles.user}>

                <div className={Styles.mainname}>
                    
                    <div className={Styles.name}>
                    <span className={Styles.username}>{name}</span>
                    </div>

                    <div className={Styles.verify}>
                    <VerifiedIcon className={Styles.verified} />
                    </div>
                    </div>
                    

                     
                        <div className={Styles.jdate}>

                        <div className={Styles.badge}>
                            <MilitaryTechIcon className={Styles.badgeicon}/>
                            </div>
                            <div className={Styles.dates}>
                        <span className={Styles.date}>Joined since 2025</span>
                        </div>
                        </div>
                        </div>




                    <div className={Styles.element}>



                    <div className={Styles.icon}>

                        <PersonIcon className={Styles.elementicon} />
                        </div>
                        <div className={Styles.title}>
                        
                        <span className={Styles.elementname}><Link to='/user/profile' className={Styles.link}>  Account Info</Link></span>
                        <span className={Styles.elementsub}>manage your profile,bookings & more</span>
                        </div>
                        </div>

                    <div className={Styles.element}>
                        <div className={Styles.icon}>
                            <ConfirmationNumberIcon className={Styles.elementicon} />
                        </div>
                        <div className={Styles.title}>
                            <span className={Styles.elementname}><Link to='/user/bookings' className={Styles.link}>Bookings</Link></span>
                            <span className={Styles.elementsub}>check your latest/cancelled/pending bookings</span>
                        </div>
                    </div>
                    <div className={Styles.element}>
                        <div className={Styles.icon}>

                            <HailIcon className={Styles.elementicon} />
                        </div>
                        <div className={Styles.title}>

                            <span className={Styles.elementname}><Link to='/user/cotraveller' className={Styles.link}>Co-Travellers</Link></span>
                            <span className={Styles.elementsub}>add or delete respective travellers details</span>

                        </div>
                    </div>
                    <div className={Styles.element}>
                        <div className={Styles.icon}>
                            <LockIcon className={Styles.elementicon} />
                        </div>
                        <div className={Styles.title}>

                            <span className={Styles.elementname}><Link to='/user/settings' className={Styles.link}>Settings</Link></span>
                            <span className={Styles.elementsub}>manage notifications & more</span>

                        </div>
                    </div>
                    <div className={Styles.element}>
                        <div className={Styles.icon}>
                            <ExitToAppIcon className={Styles.elementicon} />
                        </div>
                        <div className={Styles.title}>

                            <span className={Styles.elementname}><Link to='/user' className={Styles.link}>Logout</Link></span>
                            <span className={Styles.elementsub}>logout from your account</span>

                        </div>
                    </div>

                </div>
            </div>
           
        </div>

    )
}

export default Sidebar