import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Styles from './Profile.module.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Main from './components/main/Main'
const Profile = () => {
  return (
    <div className={Styles.container}>
        <Navbar/>
        <div className={Styles.sub}>

   
        <div className={Styles.sidebar}>  <Sidebar/></div>
        <div className={Styles.main}>     <Main/></div>
   </div>

    </div>
  )
}

export default Profile