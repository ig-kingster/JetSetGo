import React, { useEffect, useState } from 'react'
import Styles from './district.module.scss'
import { Box, Button, Paper, TextField, InputAdornment, MenuItem, Select, FormControl } from '@mui/material'
import { MyTheme } from '../../context/ThemeContext'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from 'react-toastify';


const Districts = () => {
  const [check, setCheck] = useState(true)
  const [dname, setDname] = useState("")
  const [state_id, setState] = useState("")
  const [data, setData] = useState([])
  const paginationModel = { page: 0, pageSize: 5 };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const data = {
              district_name:dname,
              state_id
          }
          const response = await axios.post('http://127.0.0.1:8000/district', data)
          console.log('District added successful:', response.data);
                      toast.success("  District Added Sucessfully");
          
          setDname("")
          setState("")
      } catch (error) {
          console.error('Error registering:', error);
                      toast.error("  Error Adding District ");
          
      }
  }

  const fetchState = () => {
      axios.get(`http://127.0.0.1:8000/state`).then((response) => {
          console.log(response.data);
                      toast.success("  States Fetched Sucessfully");
          
          setData(response.data)
      });
  };
  useEffect(() => {
    fetchState()
  }, [])


  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "state_name", headerName: "State Name", width: 200 },
    { field: "district_name", headerName: "District Name", width: 200 },


];

  return (
    <div className={`${check ? 'home light' : 'home dark'}`}>
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Box component={'form'} onSubmit={handleSubmit} className={Styles.Container}>
          <div className={Styles.Banner}>
            <h1>Explore Districts</h1>
          </div>
          
          <div className={Styles.Sub}>
            <div className={Styles.Text}>
              <FormControl fullWidth>
                <Select
                  className={Styles.Sel}
                  value={state_id}
                  onChange={(e) => setState(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <PublicIcon />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="">
                    <em>Select State</em>
                  </MenuItem>
                  {data.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.state_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField 
                className={Styles.Field} 
                value={dname} 
                label="District Name" 
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCityIcon  />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setDname(e.target.value)} 
              />
                
              <Button 
                type='submit' 
                className={Styles.Buttons} 
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Save Destination
              </Button>
            </div>
            
            {/* <div className={Styles.Image}>
              <img 
                src="https://img.freepik.com/free-vector/colorful-tourist-map_23-2147650035.jpg" 
                alt="Travel Map" 
              /> */}
            {/* </div> */}
          </div>
        </Box>
      </div>
    </div>
  )
}

export default Districts