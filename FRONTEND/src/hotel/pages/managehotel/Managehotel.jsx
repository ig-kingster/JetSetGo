import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Styles from "./ManageHotel.module.scss"; // SCSS module
import Navbar from "../../components/navbar/Navbar";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { CameraAlt, Lock, Edit } from "@mui/icons-material";

import axios from "axios";
import { toast } from "react-toastify";



const ManageHotel = () => {
  const [hotel, setHotel] = useState("");

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const hid = sessionStorage.getItem("hid");

  // Fetching hotel data on component mount
  useEffect(() => {
    fetchData();
  }, []);

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/hoteldetails/${hid}`);
        console.log("API Response:", response.data);  // Debugging step
        const data = response.data;
        data.hotel_status = data.hotel_status === "accept" ? "active" : "inactive";
        setHotel(data);
       
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };
  

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append("name", hotel.hotel_name);
    data.append("address", hotel.hotel_address);
    data.append("room", hotel.hotel_room_count);
  
    await updateHotelData(data); // Pass data to update function
  };
  
  const updateHotelData = async (data) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/updatehotel/${hid}`, data);
      console.log("Update Response:", response.data);
      toast.success("Hotel updated successfully!");
    } catch (error) {
      console.error("Error updating hotel:", error);
      toast.error("Failed to update hotel.");
    }
  };
  
  const handleProfileUpdate = async () => {
    try {
      const updatedHotel = { ...hotel, hotel_photo: selectedImage || hotel.hotel_photo };
      const formData = new FormData();
      formData.append("name", updatedHotel.hotel_name);
      formData.append("address", updatedHotel.hotel_address);
      formData.append("room", updatedHotel.hotel_room_count);
      if (selectedImage) {
        formData.append("hotel_photo", selectedImage);
      }
  
      await updateHotelData(formData); // Pass formData
      setHotel(updatedHotel);
      setOpenEditDialog(false);
      setOpenImageDialog(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };
  

  // // Handle profile update
  // const handleProfileUpdate = async () => {
  //   try {
  //     const updatedHotel = { ...hotel, hotel_photo: selectedImage || hotel.hotel_photo };
  //     await updateHotelData();

  //     setHotel(updatedHotel);
  //     setOpenEditDialog(false);
  //     setOpenImageDialog(false);
  //     toast.success("Profile updated successfully!");
  //   } catch (error) {
  //     toast.error("Failed to update profile");
  //   }
  // };
  
  // Handle password change
  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      // Add actual API call for password change
      alert("Password changed successfully!");
      setOpenPasswordDialog(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert("Failed to change password");
    }
  };

  return (
    <div className={Styles.navbar}>
      <Navbar />
      <div className={Styles.manageHotelContainer}>
        <Sidebar />
        <div className={Styles.manageHotelSection}>
          <h1>Manage Hotel</h1>
          <div className={Styles.profileEditContainer}>
            {/* Left Column: Hotel Photo */}
            <div className={Styles.profilePhotoSection}>
              <img
                src={selectedImage || hotel.hotel_photo}
                alt="Hotel"
                className={Styles.hotelPhoto}
              />
              <button
                className={Styles.changePhotoButton}
                onClick={() => setOpenImageDialog(true)}
              >
                <CameraAlt />  
              </button>
            </div>

            {/* Right Column: Hotel Details */}
            <div className={Styles.hotelDetails}>
              <h2>{hotel.hotel_name}</h2>
              <p>
                <strong>Email:</strong> {hotel.hotel_email}
              </p>
              <p>
                <strong>Address:</strong> {hotel.hotel_address}
              </p>
              <p>
                <strong>Status:</strong> {hotel.hotel_status}
              </p>
              <p>
                <strong>Rooms:</strong> {hotel.hotel_room_count}
              </p>
              <div className={Styles.actionButtons}>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={() => setOpenEditDialog(true)}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Lock />}
                  onClick={() => setOpenPasswordDialog(true)}
                >
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Box component={'form'} className={Styles.sub} onSubmit={handleSubmit}>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            label="Hotel Name"
            fullWidth
            margin="normal"
            name="hotel_name"
            value={hotel.hotel_name}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            name="hotel_email"
            value={hotel.hotel_email}
            onChange={handleChange}
            disabled
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            name="hotel_address"
            value={hotel.hotel_address}
            onChange={handleChange}
          />
          <TextField
            label="Room Count"
            fullWidth
            margin="normal"
            type="number"
            name="hotel_room_count"
            value={hotel.hotel_room_count}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleProfileUpdate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </Box>

      {/* Change Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Current Password"
            fullWidth
            margin="normal"
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, currentPassword: e.target.value })
            }
          />
          <TextField
            label="New Password"
            fullWidth
            margin="normal"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
          />
          <TextField
            label="Confirm New Password"
            fullWidth
            margin="normal"
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, confirmPassword: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button onClick={handlePasswordChange} color="primary">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Image Dialog */}
      <Dialog open={openImageDialog} onClose={() => setOpenImageDialog(false)}>
        <DialogTitle>Update Hotel Image</DialogTitle>
        <DialogContent>
          <div className={Styles.imageUploadSection}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={Styles.fileInput}
            />
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Preview"
                className={Styles.imagePreview}
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenImageDialog(false)}>Cancel</Button>
          <Button onClick={handleProfileUpdate} color="primary">
            Update Image
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageHotel;