import React from 'react'
import Dashboard from '../guide/pages/dashboard/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Profile from '../guide/pages/profile/Profile'


const GuideRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default GuideRoutes