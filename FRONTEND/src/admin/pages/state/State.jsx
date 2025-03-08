import React, { useState, useEffect } from "react";
import Styles from "./State.module.scss";
import { Box, Button, TextField, Paper, InputAdornment } from "@mui/material"; // ✅ Added missing InputAdornment
import { MyTheme } from "../../context/ThemeContext";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import TableRowsIcon from '@mui/icons-material/TableRows';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // ✅ Missing LocationOnIcon import
import PublicIcon from '@mui/icons-material/Public'; // ✅ Missing PublicIcon import
import SaveIcon from '@mui/icons-material/Save'; // ✅ Missing SaveIcon import
import { toast } from 'react-toastify';


const State = () => {
    const [check, setCheck] = useState(true);
    const [sname, setSname] = useState("");
    const [states, setStates] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const paginationModel = { page: 0, pageSize: 5 };

    useEffect(() => {
        fetchStates();
    }, []);

    const fetchStates = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/state");
            const formattedStates = response.data.map((state, index) => ({
                id: state.id || index + 1,
                state_name: state.state_name,
            }));
            setStates(formattedStates);
            toast.success("  States Fetched Sucessfully");

        } catch (error) {
            toast.error("Error Fetcching States");
            console.error("Error fetching states:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { state_name: sname };
            await axios.post("http://127.0.0.1:8000/state", data);
            setSname("");
            fetchStates();
            setShowForm(false);
            toast.success("  States Added Sucessfully");

        } catch (error) {
            console.error("Error adding state:", error);
            toast.error("Error Adding States");

            
        }
    };


    return (
        <div className={`${check ? "home light" : "home dark"}`}>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                 <Box component={"form"} onSubmit={handleSubmit} className={Styles.Container}>

                <div className={Styles.Banner}>
                    <h1>Explore States</h1>
                
                </div>
                        <div className={Styles.Sub}>
                            <div className={Styles.Text}>
                                <TextField
                                    className={Styles.Field}
                                    label="Destination State"
                                    variant="standard"
                                    value={sname}
                                    onChange={(e) => setSname(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PublicIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button 
                                    type="submit" 
                                    className={Styles.Buttons} 
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                >
                                    Save Destination
                                </Button>
                            </div>
                            {/* <div className={Styles.Image}>
                                <img
                                    src="https://img.freepik.com/free-vector/world-map-infographic-scroll-style_23-2148830022.jpg"
                                    alt="Travel Map"
                                />
                            </div> */}
                        </div>
                    </Box>
               
            </div>
        </div>
    );
};

export default State;
