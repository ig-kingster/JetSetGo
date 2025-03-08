import React from 'react'
import Navbar from '../../component/navbar/Navbar'
import Sidebar from '../../component/sidebar/Sidebar'
import Main from './components/Main/Main'
import Styles from './Profile.module.scss'
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