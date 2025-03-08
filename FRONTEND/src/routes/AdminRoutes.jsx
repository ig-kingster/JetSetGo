import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../admin/pages/home/Home'
import Districts from '../admin/pages/districts/Districts'
import Place from '../admin/pages/place/Place'
import State from '../admin/pages/state/State'
import Application from '../admin/pages/Applications/Application'
import Users from '../admin/pages/users/Users'

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/district' element={<Districts />}></Route>
        <Route path='/state' element={<State />}></Route>
        <Route path='/place' element={<Place />}></Route>
        <Route path='/application' element={<Application />}></Route>
        <Route path='/users' element={<Users />}></Route>


      </Routes>
    </div>
  )
}

export default AdminRoutes