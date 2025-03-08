import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../hotel/pages/dashboard/Dashboard'
import Packageadd from '../hotel/pages/packageadd/Packageadd'
import AddGuide from '../hotel/pages/addguide/Addguide'
import Managehotel from '../hotel/pages/managehotel/Managehotel'
import EditPackage from '../hotel/pages/editpackage/Editpackage'
import Packages from '../hotel/pages/packages/Packages'
import Guides from '../hotel/pages/guides/Guides'
import Booking from '../hotel/pages/bookings/Booking'

const HotelRoutes = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path='/packageadd' element={<Packageadd />} />
      <Route path='/addguide' element={<AddGuide />} />
      <Route path='/managehotel' element={<Managehotel />} />
      <Route path='/editpackage' element={<EditPackage />} />
      <Route path='/packages' element={<Packages />} />
      <Route path='/guides' element={<Guides />} />
      <Route path='/bookings' element={<Booking />} />








      </Routes>
    </div>
  )
}

export default HotelRoutes