import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../user/pages/home/Home'
import Profile from '../user/pages/profile/Profile'
import Cotraveller from '../user/pages/cotraveller/cotraveller'
import Settings from '../user/pages/settings/Settings'
import Bookings from '../user/pages/booking/Bookings'
import ViewMore from '../user/pages/viewmore/ViewMore'
import Search from '../user/pages/search/Search'
import Payment from '../user/pages/payment/Payment'
import HotelProfile from '../user/pages/hotelprofile/HotelProfile'

const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/bookings' element={<Bookings />} />
        <Route path='/cotraveller' element={<Cotraveller />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/viewmore' element={<ViewMore />} />
        <Route path='/search' element={<Search />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/hotelprofile' element={<HotelProfile />} />

      </Routes>
    </div>
  )
}

export default UserRoutes