import React from 'react'
import Styles from './Settings.module.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Main from './components/main/Main'
const Settings = () => {
  return (
    <div className={Styles.container}>
    <div className={Styles.navbar}><Navbar/></div>  
      <div className={Styles.sub}>

 
      <div className={Styles.sidebar}>  <Sidebar/></div>
      <div className={Styles.main}>     <Main/></div>
 </div>

  </div>
  )
}

export default Settings