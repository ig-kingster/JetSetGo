import React, { useEffect, useRef, useState } from 'react';
import Styles from './Main.module.scss';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Dialog, DialogTitle, DialogContent, DialogActions, } from "@mui/material";
import { Box, IconButton, styled, Button } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Main = () => {

  const [state, setStates] = useState("");
  const [stateData, setStatedata] = useState([])
  const [districtData, setdistrictdata] = useState([])
  const [placeData, setPlacedata] = useState([])

  // const [photo, setPhoto] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [district, setDistrict] = useState("")
  const [place, setPlace] = useState("")
  const [phone, setPhone] = useState("")
  const [id, setId] = useState([])
  const [cpswd, setCpswd] = useState("")
  const [npswd, setNpswd] = useState("")

  useEffect(() => {
    fetchStates();
    fetchDetails();
  }, []);

  const uid = sessionStorage.getItem("uid");
  const fetchDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/userdetails/${uid}`);
      // console.log(response.data);
      setEmail(response.data?.user_email)
      setPhoto(response.data?.user_photo)
      setId(response.data?.user_proof)
      setAddress(response?.data.user_address)
      setName(response.data?.user_name)
      setStates(response.data?.state_name)
      setDistrict(response.data?.district_name)
      setPlace(response.data?.place_name)
      setPhone(response.data?.user_phone)
if(response.data)
{
  toast.success("User Data Found");

}

      console.log("User Data:", response.data); // Debugging

    } catch (error) {
      console.error("Error fetching states:", error);
      toast.error("Error fetching states:");

    }
  };

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


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    // data.append("photo", photo);
    data.append("name", name);
    // data.append("email", email);
    data.append("address", address);
    data.append("state", state);
    data.append("district", district);
    data.append("place", place);
    data.append("phone", phone);
    data.append("idproof", id);
    // data.append("npswd", npswd);

    const response = await axios.post(`http://127.0.0.1:8000/editUser/${uid}`, data)
    console.log(' added successful:', response.data);
    toast.success("Updated Sucessfully");
    // setStates("");  
    // setStatedata([]);  
    // setdistrictdata([]);  
    // setPlacedata([]);  

    // setPhoto([]);  
    // setName("");  
    // setEmail("");  
    // setAddress("");  
    // setDistrict("");  
    // setPlace("");  
    // setPhone("");  
    // setId([]);  
    // setNpswd("");
  }
  const [openEdit, setOpenEdit] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenChangePassword = () => setOpenChangePassword(true);
  const handleCloseChangePassword = () => setOpenChangePassword(false);
  // const handleChange = (e) => setProfileData({ ...profileData, [e.target.name]: e.target.value });



 
  const handlePswd = async (e) => {
    e.preventDefault();
  
    // Ensure password fields are not empty
    if (!npswd || !cpswd) {
      toast.error("Please fill in all password fields");
      return;
    }
  
    const data = new FormData();
    data.append("newpassword", npswd);
    data.append("currentpassword", cpswd);
  
    try {
      const response = await axios.post(`http://127.0.0.1:8000/updatepassword/${uid}`, data);
  
      // Check if update was successful
      if (response.status === 200) {
        toast.success("Password updated successfully!");
      } else {
        toast.error("Failed to update password. Please try again.");
      }
    } catch (error) {
      // Handle API errors
      if (error.response) {
        toast.error( "Error updating password");
      } else {
        toast.error("Server error. Please try again later.");
      }
      console.error("Update error:", error);
    }
  };
  







  const handleOpenImageDialog = () => setOpenImageDialog(true);
  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
    setSelectedImage(null);
    setImagePreview('');
  };


  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);
  const [photo, setPhoto] = useState('');


  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleUpdateImage = async () => {
    if (!selectedImage) return;
  
    const data = new FormData();
    data.append('profileImage', selectedImage);
    
  
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/updateprofile/${uid}`,data);
  
      console.log('Profile updated successfully:', response.data);
      setPhoto(response.data.imageUrl);
      toast.success("Profile Photo Updated Successfully");
      
      handleCloseImageDialog();
    } catch (error) {
      toast.error("Error updating profile image");
      console.error('Update error:', error);
    }
  };
  


  return (
    <div className={Styles.main}>
      <div className={Styles.profileImageContainer}>
        <img
          src={photo}
          alt="Profile"
          className={Styles.profileImage}
        />
        <IconButton
          className={Styles.editIcon}
          onClick={handleOpenImageDialog}
        >
          <EditIcon />
        </IconButton>
        <Box component={'form'} onSubmit={handleUpdateImage}>
        {/* Image Update Dialog */}
        <Dialog open={openImageDialog} onClose={handleCloseImageDialog}>
          <DialogContent className={Styles.dialogContent}>
            <h2>Update Profile Image</h2>

            <div className={Styles.imagePreview}>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" />
              ) : (
                <img src={photo} alt="Current Profile" />
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={() => fileInputRef.current.click()}
              className={Styles.browseButton}
            >
              {selectedImage ? 'Change Image' : 'Browse Image'}
            </Button>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseImageDialog}>Cancel</Button>
            <Button
              onClick={handleUpdateImage}
              variant="contained"
              color="primary"
              disabled={!selectedImage}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
</Box>

        <div className={Styles.details}>
          <div className={Styles.inputGroup}>
            <label className={Styles.label}>Name</label>
            <input type="text" defaultValue={name} className={Styles.txtfld} readOnly />
          </div>

          <div className={Styles.inputGroup}>
            <label className={Styles.label}>Email</label>
            <input type="text" defaultValue={email} className={Styles.txtfld} readOnly />

          </div>

          <div className={Styles.inputGroup}>
            <label className={Styles.label}>Phone</label>
            <input type="text" defaultValue={phone} className={Styles.txtfld} readOnly />
          </div>

          <div className={Styles.inputGroup}>
            <label className={Styles.label}>Address</label>
            <input type="text" defaultValue={address} className={Styles.txtfld} readOnly />
          </div>

          <div className={Styles.inputGroup}>
            <label className={Styles.label}>State</label>
            <input type="text" defaultValue={state} className={Styles.txtfld} readOnly />
          </div>

          <div className={Styles.inputGroup}>
            <label className={Styles.label}>District</label>
            <input type="text" defaultValue={district} className={Styles.txtfld} readOnly />
          </div>

          <div className={Styles.inputGroup}>
            <label className={Styles.label}>Place</label>
            <input type="text" defaultValue={place} className={Styles.txtfld} readOnly />
          </div>
        </div>

        <div className={Styles.btn}>
          {/* <label className={Styles.label}>Place</label>
    
    <input type="text" defaultValue={place} className={Styles.txtfld} /> */}
          <Button variant='contained' onClick={handleOpenEdit} className={Styles.editButton}>EDIT DETAILS</Button>
          <Button variant='contained' onClick={handleOpenChangePassword} className={Styles.editButton}>CHANGE PASSWORD</Button>

        </div>
      </div>



      <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth>
        {/* <DialogTitle>Edit Profile</DialogTitle> */}
        <DialogContent>
          <Box component={'form'} className={Styles.sub} onSubmit={handleSubmit}>
            <div className={Styles.title}>General Details</div>
            <div className={Styles.item}>
              <div>
              <span className={Styles.fnamelabel}>Name</span>
              </div>
              <div>
              <input type="text" name="firstName" value={name} className={Styles.txts} onChange={(e) => setName(e.target.value)} />
            </div>
            </div>
            {/* <div className={Styles.lastname}>
            <span className={Styles.snamelabel}>Last Name</span>
            <input type="text" name="lastName" className={Styles.snametxt} />
          </div> */}
          {/* <div className={Styles.email}>
            <span className={Styles.emaillabel}>Email</span>
            <input type="email" name="email" value={email} className={Styles.emailtxt} c />
          </div> */}
          <div className={Styles.item}>
            <div>
            <span className={Styles.phonelabel}>Phone Number</span>
            </div>
            <div>
            <input type="tel" name="phone" value={phone} className={Styles.txt} onChange={(e) => setPhone(e.target.value)} />
          </div>
          </div>
          <div className={Styles.item}>
          <div>
            <span className={Styles.addresslabel}>Address</span>
            </div>
            <div>
            <input type='text' name="address" className={Styles.txt} value={address} rows="3" onChange={(e) => setAddress(e.target.value)} />
          </div>
          </div>
          <div className={Styles.location}>
            <div className={Styles.state}>
              <span className={Styles.statelabel}>State</span>
              <select name="state" className={Styles.statetxt}
                onChange={(e) => {
                  setStates(e.target.value);
                  fetchDistrict(e.target.value);
                }}>
                <option value="">select</option>
                {
                  stateData && stateData.map((item, index) => (
                    <option key={index} value={item._id}>{item.state_name}</option>

                  ))
                }
              </select>
            </div>
            <div className={Styles.district}>
              <span className={Styles.districtlabel}>District</span>
              <select name="district" className={Styles.districttxt}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  fetchPlace(e.target.value);
                }}>
                <option value="">select</option>
                {
                  districtData && districtData.map((item, index) => (
                    <option key={index} value={item._id}>{item.district_name}</option>

                  ))
                }
              </select>
            </div>
            <div className={Styles.place}>
              <span className={Styles.placelabel}>Place</span>
              <select name="place" className={Styles.placetxt} onChange={(e) => setPlace(e.target.value)}>
                <option value="">select</option>
                {
                  placeData && placeData.map((item, index) => (
                    <option key={index} value={item._id}>{item.place_name}</option>

                  ))
                }
              </select>
            </div>
          </div>
          <div className={Styles.images}>
            {/* <div className={Styles.profile}>
              <span className={Styles.photolabel}>Photo</span>
              <label className={Styles.photolabel1}>
                <IconButton
                  component="label"
                  role={undefined}

                >
                  < UploadFileIcon />
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => setPhoto(event.target.files[0])}

                  />
                </IconButton>
                {/* <span className={Styles.photoicon}><UploadFileIcon/>Choose Photo</span>
          <input type='file' className={Styles.file}/> */}

            <div className={Styles.profile}>
              <span className={Styles.photolabel}>ID Proof</span>
              <label className={Styles.photolabel1}>
                <IconButton
                  component="label"
                  role={undefined}

                >
                  < UploadFileIcon />
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => setId(event.target.files[0])}

                  />
                </IconButton>
                {/* <span className={Styles.photoicon}><UploadFileIcon/>Choose Photo</span>
          <input type='file' className={Styles.file}/> */}
              </label>
            </div>
            </div>

            <div className={Styles.update}>
              <button type="submit" className={Styles.updatebtn}>Update</button>
            </div>
            
          </Box>

        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button> */}
          {/* <Button variant="contained" onClick={handleClose}>Save</Button> */}
        </DialogActions>
      </Dialog>
      <Dialog open={openChangePassword} onClose={handleCloseChangePassword} fullWidth>
        {/* <DialogTitle>Change Password</DialogTitle> */}
        <DialogContent>
          <Box component={'form'} className={Styles.password} onSubmit={handlePswd}>
            <span className={Styles.title}>Change Password</span>
            <div className={Styles.currentpassword}>
              <span className={Styles.currentpswdlbel}>Current Password</span>
              <input type="password" name="currentPassword" className={Styles.currentpswd}  onChange={(e) => setCpswd(e.target.value)}  />
            </div>
            <div className={Styles.newpassword}>
              <span className={Styles.newpswdlbel}>New Password</span>
              <input type="password" name="newPassword" className={Styles.newpswd}  onChange={(e) => setNpswd(e.target.value)} />
            </div>
            <div className={Styles.update}>
              <button type="submit" className={Styles.updatebtn}>Update</button>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button> */}
          {/* <Button variant="contained" onClick={handleClose}>Save</Button> */}
        </DialogActions>
      </Dialog>
    </div>

  );
};

export default Main;