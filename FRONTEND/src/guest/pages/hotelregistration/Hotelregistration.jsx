import React, { useEffect, useState } from 'react';
import Styles from './HotelRegistration.module.scss';
import { Box } from '@mui/material';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';

const HotelRegistration = () => {
  const [state, setStates] = useState("");
  const [stateData, setStatedata] = useState([])
  const [districtData, setdistrictdata] = useState([])
  const [district, setDistrict] = useState([])

  const [placeData, setPlacedata] = useState([])
  const [place, setPlace] = useState([])

  useEffect(() => {
    fetchStates();
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const fetchStates = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/state");
      setStatedata(response.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchDistrict = (state_id) => {
    console.log(state_id);
    axios.get(`http://127.0.0.1:8000/district/${state_id}`).then((response) => {
      console.log(response.data);
      setdistrictdata(response.data)
    });
  };

  const fetchPlace
    = (district_id) => {
      console.log(district_id);
      axios.get(`http://127.0.0.1:8000/place/${district_id}`).then((response) => {
        console.log(response.data);
        setPlacedata(response.data)
      });
    };



const [photo, setPhoto] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [id, setId] = useState([])
  const [pswd, setPswd] = useState("")


    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const data = new FormData();
      data.append("photo", photo);
      data.append("name", name);
      data.append("email", email);
      data.append("address", address);
      data.append("place", place);
      data.append("idproof", id);
      data.append("password",pswd);
  
      const response = await axios.post("http://127.0.0.1:8000/hotelreg", data)
      console.log(' added successful:', response.data);
      toast.success("Registeration Submitted Sucessfully");



    setStates("");  
    setStatedata([]);  
    setdistrictdata([]);  
    setPlacedata([]);  

    setPhoto([]);  
    setName("");  
    setEmail("");  
    setAddress("");  
    setDistrict("");  
    setPlace("");  
    setId([]);  
    setPswd("");

    }







  return (
    <div className={Styles.container}>
      <div className={Styles.formContainer}>
        <h2 className={Styles.title}>Hotel Registration</h2>
        {/* <Box> */}
          <Box component={'form'}  onSubmit={handleSubmit} className={Styles.form}>
          <div className={Styles.formGrid}>
            {/* Hotel Name */}
            <div className={Styles.formGroup}>
              <label className={Styles.label}>
                Hotel Name <span className={Styles.required}>*</span>
              </label>
              <input
                type="text"
                name="hotel_name"
                onChange={(e) => setName(e.target.value)}
                className={Styles.inputField}
              />
            </div>

            {/* Hotel Email */}
            <div className={Styles.formGroup}>
              <label className={Styles.label}>
                Email <span className={Styles.required}>*</span>
              </label>
              <input
                type="text"
                name="hotel_email"
                onChange={(e) => setEmail(e.target.value)}
                className={Styles.inputField}
              />
            </div>

            {/* Hotel Address */}
            <div className={`${Styles.formGroup} ${Styles.fullWidth}`}>
              <label className={Styles.label}>
                Address <span className={Styles.required}>*</span>
              </label>
              <textarea
                name="hotel_address"
                onChange={(e) => setAddress(e.target.value)} 
                className={`${Styles.inputField} ${Styles.textarea}`}
                rows="3"
              />
            </div>

            {/* Location Dropdown */}
            <div className={Styles.formGroup}>
              <label className={Styles.label}>
                State <span className={Styles.required}>*</span>
              </label>
              <select
                name="place_id"
                onChange={(e) => {
                  setStates(e.target.value);
                  fetchDistrict(e.target.value);
                }}
                className={Styles.inputField}
              >
                <option value="">Select a location</option>
                {
                  stateData && stateData.map((item, index) => (
                    <option key={index} value={item._id}>{item.state_name}</option>

                  ))
                }
              </select>


              <label className={Styles.label}>
                District <span className={Styles.required}>*</span>
              </label>
              <select
                onChange={(e) => {
                  setDistrict(e.target.value);
                  fetchPlace(e.target.value);
                }}>
                <option value="">Select a location</option>
                {
                  districtData && districtData.map((item, index) => (
                    <option key={index} value={item._id}>{item.district_name}</option>

                  ))
                }
              </select>

              <label className={Styles.label}>
                Place <span className={Styles.required}>*</span>
              </label>
              <select
               onChange={(e) => setPlace(e.target.value)}>
                <option value="">Select a location</option>
                {
                  placeData && placeData.map((item, index) => (
                    <option key={index} value={item._id}>{item.place_name}</option>

                  ))
                }
              </select>
            </div>

            {/* Hotel Status
            <div className={Styles.formGroup}>
              <label className={Styles.label}>
                Status <span className={Styles.required}>*</span>
              </label>
              <select
                name="hotel_status"
                value={formData.hotel_status}
                onChange={handleChange}
                className={Styles.inputField}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div> */}

            {/* Room Count
            <div className={Styles.formGroup}>
              <label className={Styles.label}>
                Room Count <span className={Styles.required}>*</span>
              </label>
              <input
                type="number"
                name="hotel_room_count"
                value={formData.hotel_room_count}
                onChange={handleChange}
                min="1"
                className={Styles.inputField}
              />
              {errors.hotel_room_count && <p className={Styles.errorText}>{errors.hotel_room_count}</p>}
            </div> */}

            {/* Password */}
            <div className={Styles.formGroup}>
              <label className={Styles.label}>
                Password <span className={Styles.required}>*</span>
              </label>
              <div className={Styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="hotel_password"
                  onChange={(e) => setPswd(e.target.value)} 
               
                  className={Styles.inputField}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={Styles.passwordToggle}
                >
                  {showPassword ? <VisibilityOffIcon className={Styles.icon}/> : <VisibilityIcon className={Styles.icon}/>}
                </button>
              </div>
            </div>

            {/* Hotel Proof Upload */}
            <div className={Styles.formGroup}>
              <label className={Styles.label}>
                Hotel Proof (PDF) <span className={Styles.required}>*</span>
              </label>
              <input
                type="file"
                name="hotel_proof"
                onChange={(e) => setId(e.target.files[0])} 
                className={Styles.fileInput}
                accept="application/pdf"
              />
            </div>

            {/* Hotel Photo Upload */}
            <div className={Styles.formGroup}>
              <label className={Styles.label}>
                Hotel Photo <span className={Styles.required}>*</span>
              </label>
              <input
                type="file"
                name="hotel_photo"
                onChange={(e) => setPhoto(e.target.files[0])}
                className={Styles.fileInput}
                accept="image/*"
              />
            </div>
          </div>

          <button type="submit" className={Styles.submitButton}>
            Register Hotel
          </button>
        </Box>
      </div>
    </div>
  );
};

export default HotelRegistration;