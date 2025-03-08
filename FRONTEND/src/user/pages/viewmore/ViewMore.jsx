import React from 'react'
import Styles from './ViewMore.module.scss'
import View from './components/view/View'
import Navbar from '../../components/navbar/Navbar'
const ViewMore = () => {
  return (
    <div className={Styles.container}>
        <Navbar/>
        <View/></div>
  )
}

export default ViewMore