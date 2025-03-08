import React, { useState } from 'react'
import Styles from './Login.module.scss'
import { Box, Button } from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

  const [user_email, setEmail] = useState("")
  const [user_password, setPassword] = useState("")
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user_email.trim() || !user_password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const data = {
        user_email: user_email,
        user_password: user_password
      };
      
      const response = await axios.post('http://127.0.0.1:8000/login', data)
      console.log('login successful:', response.data);

      const {id,status,login} = response.data
      if(login === "User"){
      toast.success("Login successful!");

        sessionStorage.setItem("uid",id)
        navigate("/user")
      }
      else if(login === "Hotel"){
        if(status==="accept"){
        sessionStorage.setItem("hid",id)
        navigate("/hotel")
      toast.success("Login successful!");

        }
        if(status === "reject")
        {
          toast.error("Your Application Is Rejected ,Register Again")

        }
        else{
          toast.error("Your Application Is Currently Pending")
        }
      }
      
      else{
        toast.error("Login not found. Please check your credentials.");
      }
      
      // else if(login === "Admin"){
      //   sessionStorage.setItem("aid",id)
      //   navigate("/admin")
      // }
      // else if(login === "User"){
      //   sessionStorage.setItem("uid",id)
      //   navigate("/user")
      // }
      // else if(login === "DeliveryBoy"){
      //   sessionStorage.setItem("dbid",id)
      //   navigate("/deliveryBoy")
      // }



      setEmail("")
      setPassword("")


    } catch (error) {
      console.error('Error registering:', error);
   
      toast.error("Something went wrong. Please try again.");


    }
  };


return (
    <div className={Styles.logform}>
    <div className={Styles.form}>

         <div className={Styles.part1}>
          <img src='https://img.freepik.com/free-vector/winter-landscape-with-frozen-lake-clouds_107791-1861.jpg?t=st=1737525122~exp=1737528722~hmac=ab3b886f53bfc5eea45fc623657b7a0f5e1023951383c1faeb88f695717d83d5&w=1380' className={Styles.bg}/>
        <img src='https://images.emtcontent.com/nwhomfiles/freebooking.png' className={Styles.img}/>
      </div>

      <Box component={'form'} onSubmit={handleSubmit}  className={Styles.part2}>
      <div className={Styles.close}></div>

      <div className={Styles.titles}>
        <span className={Styles.title}>Login</span>

      </div>
      <div className={Styles.fields}>
        <div className={Styles.field}>
          <input type='text' placeholder='enter email' className={Styles.email}    value={user_email} onChange={(e) => setEmail(e.target.value)}/>
          <input type='password'placeholder='enter password' className={Styles.password}   value={user_password}  onChange={(e) => setPassword(e.target.value)}/>

        </div>
      </div>          
      <div className={Styles.btn}>
        <Button type='submit'
         className={Styles.submit}> LogIn</Button>
      </div>
      <div className={Styles.policy}>
        <span className={Styles.policys}> By logging in,</span>
        <span className={Styles.policys}>I understand & agree to EaseMyTrip terms of use and privacy policy</span>
      </div>
    </Box>
      </div>
    </div>
  )
}

export default Login