import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from '../guest/pages/index/Index'
import Register from '../guest/pages/register/Register'
import Login from '../guest/pages/login/Login'
import HotelRegistration from '../guest/pages/hotelregistration/Hotelregistration'

const GuestRoutes = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/hotelreg" element={<HotelRegistration />}/>

      </Routes>

    </div>
  )
}

export default GuestRoutes