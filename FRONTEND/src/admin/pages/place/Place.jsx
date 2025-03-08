import React, { useEffect, useState } from 'react'
import Styles from './place.module.scss'
import { Box, Button, TextField, InputAdornment, MenuItem, Select, FormControl } from '@mui/material'
import { MyTheme } from '../../context/ThemeContext'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import axios from "axios";
import PublicIcon from '@mui/icons-material/Public';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PlaceIcon from '@mui/icons-material/Place';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from 'react-toastify';

const Place = () => {
    const [check, setCheck] = useState(true)
    // const [district, setDistrict] = useState("")
    //   const [data, setData] = useState([])

    // const fetchDistrict = () => {
    //     axios.get(`http://127.0.0.1:8000/district`).then((response) => {
    //         console.log(response.data);
    //         setDistrict(response.data)
    //     });
    // };
    // useEffect(() => {
    //     fetchDistrict()
    // }, [])
    const [stateData, setStatedata] = useState([])
    const [districtData, setdistrictdata] = useState([])
    const [district, setDistrict] = useState("")
  const [pname, setPname] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const data = {
            place_name:pname,
            district_id:district
        }
        
        const response = await axios.post('http://127.0.0.1:8000/place', data)
        console.log('District added successful:', response.data);
                    toast.success("  Place Added Sucessfully");
        
        setPname("")
        setDistrict("")
    } catch (error) {
        toast.error(" Error Adding Place");
        
        console.error('Error registering:', error);
    }
}



    useEffect(() => {
        fetchStates();
    }, []);

    const fetchStates = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/state");
            setStatedata(response.data);
                        toast.success("  States Fetched Sucessfully");
            
        } catch (error) {
            console.error("Error fetching states:", error);
                        toast.error("   Fetching State");
            
        }
    };

    const fetchDistrict = (state_id) => {
        console.log(state_id);
        axios.get(`http://127.0.0.1:8000/district/${state_id}`).then((response) => {
            console.log(response.data);
                        toast.success("  District Fetched Sucessfully");
            
            setdistrictdata(response.data)
        });
    };

    return (
        <div className={`${check ? 'home light' : 'home dark'}`}>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <Box component={'form'} onSubmit={handleSubmit} className={Styles.Container}>
                    <div className={Styles.Banner}>
                        <h1>Discover Places</h1>
                    </div>
                    <div className={Styles.Sub}>
                        <div className={Styles.Text}>
                            <FormControl fullWidth>
                                <Select
                                    className={Styles.Sel}
                                    onChange={(e) => fetchDistrict(e.target.value)}
                                    displayEmpty
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PublicIcon />
                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem value="">
                                        <em>Select State</em>
                                    </MenuItem>
                                    {stateData.map((item) => (
                                        <MenuItem key={item._id} value={item._id}>
                                            {item.state_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <Select
                                    className={Styles.Sel}
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                    displayEmpty
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <LocationCityIcon />
                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem value="">
                                        <em>Select District</em>
                                    </MenuItem>
                                    {districtData.map((item) => (
                                        <MenuItem key={item._id} value={item._id}>
                                            {item.district_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField 
                                className={Styles.Field} 
                                label="Landmark Name" 
                                variant="standard"
                                value={pname}
                                onChange={(e) => setPname(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PlaceIcon />
                                        </InputAdornment>
                                    ),
                                }}
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
                                src="https://img.freepik.com/free-vector/travel-landmarks-background_23-2147542369.jpg" 
                                alt="World Landmarks" 
                            />
                        </div> */}
                    </div>
                </Box>
            </div>
        </div>
    )
}

export default Place