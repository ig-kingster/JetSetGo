import React, { useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'

import './home.scss'
import Widget from '../../components/widgets/Widget'
import Featured from '../../components/featured/Featured'
import Chart from '../../components/chart/Chart'
import { MyTheme } from '../../context/ThemeContext'
import Table from '../../components/table/Table'

const Home = () => {
  const [check,setCheck] = useState(true)
  return (
    <MyTheme.Provider value={{check,setCheck}}>
    <div className={`${check ? 'home light' : 'home dark'}`}>
      <Sidebar/>
      <div className="homeContainer">
        <Navbar/>
        <div className="widgets">
          <Widget type="user"/>
          <Widget type="order"/>
          <Widget type="earning"/>
          <Widget type="balance"/>
        </div>
        <div className="charts">
          <Featured/>
          <Chart/>
        </div>
        <div className="listContainer">
          <div className="listTitle">
            Latest Transactions
          </div>
          <Table />
        </div>
      </div>
    </div>
  </MyTheme.Provider>
  )
}

export default Home