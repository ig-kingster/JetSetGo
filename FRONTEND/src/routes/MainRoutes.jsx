import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GuestRoutes from './GuestRoutes'
import UserRoutes from './UserRoutes'
import GuideRoutes from './GuideRoutes'
import AdminRoutes from './AdminRoutes'
import HotelRoutes from './HotelRoutes'

const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/*' element={<GuestRoutes/>}/>
        <Route  path='/user/*' element={<UserRoutes/>}/>
        <Route path='/guide/*' element={<GuideRoutes/>}/>
        <Route path='/admin/*' element={<AdminRoutes/>}/>
        <Route path='/hotel/*' element={<HotelRoutes/>}/>


      </Routes>
    </div>
  )
}

export default MainRoutes