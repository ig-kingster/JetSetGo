
import React from 'react'
import Styles from './App.module.scss'
import MainRoutes from './routes/MainRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div><MainRoutes/>
    <ToastContainer autoClose={2000} theme="colored" />
    </div>
  )
}

export default App