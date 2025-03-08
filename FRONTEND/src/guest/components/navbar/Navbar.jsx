import React from 'react'
import Styles from './Navbar.module.scss'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import BasicMenu from '../basicmenu/BasicMenu';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
 <div className={Styles.Container}>
  <div className={Styles.Image}>
            <img src="https://i.ibb.co/dJHmJmC4/jsg.png" className={Styles.logo} alt="Logo"/>
    
          {/* <img src='data:image/png;base64,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' /> */}
          
        </div>

        <div className={Styles.search}>
        <button className={Styles.btn} ><Link to={'./user'}><SearchSharpIcon /></Link></button>
           
            <input type='text' className={Styles.txt} placeholder='search your destination' />
            {/* <input type='submit' name='search' value='<SearchSharpIcon/>' className={Styles.btn} /> */}
          </div>


      <div className={Styles.Contact}>
        <div className={Styles.Contacts}>
          <div className={Styles.ContactIcon}><SupportAgentIcon className={Styles.icon} />
            <span>+9194574126</span>
          </div>
          <div className={Styles.ContactIcon}>
            <AlternateEmailIcon className={Styles.icon} />
            <span>jetsetgo@gmail.com</span>
          </div>
        </div>
    <div className={Styles.Logins}>
        <div className={Styles.Login}>
          {/* <PersonIcon  /> */}
          <BasicMenu/>
        
            {/* <Link to={'./register'} className={Styles.btn}>Login</Link>  */}
        </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar