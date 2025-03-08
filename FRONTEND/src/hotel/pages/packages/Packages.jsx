import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Styles from "./Packages.module.scss";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Card,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
} from "@mui/material";
import { motion } from "framer-motion";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [packagebodyDetails, setPackagebodyDetails] = useState(""); // Store input details
  const [alreadySelectedPlaces, setAlreadySelectedPlaces] = useState([]); // Store already added places
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [packageBodies, setPackageBodies] = useState([]); // Store package bodies for place selection
  const [galleryData, setGalleryData] = useState({ packagebody_id: "", gallery_file: null, gallery_description: "" });
  const hid = sessionStorage.getItem("hid");


  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/packages/${hid}`);
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    if (hid) {
      fetchPackages();
    }
  }, [hid]);

  const handleOpenDialog = async (pkg) => {
    setSelectedPackageId(pkg._id);
    setOpenDialog(true);

    try {
      const response = await axios.get("http://127.0.0.1:8000/placesadd");
      setPlaces(response.data);

      // Extract already added places from package_bodies
      const alreadySelected = pkg.package_bodies.map((body) => body.place._id);
      setAlreadySelectedPlaces(alreadySelected);
      setSelectedPlaces([]); // Clear previous selections
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPlaces([]);
    setPackagebodyDetails(""); // Clear input
  };

  // const handleSavePlaces = async () => {
  //   try {
  //     const packageBodies = selectedPlaces.map((place) => ({
  //       packagebody_details: packagebodyDetails, // Default if empty
  //       place_id: place._id,
  //       packagehead_id: selectedPackageId,
  //     }));

  //     await axios.post("http://127.0.0.1:8000/packagebody", packageBodies);

  //     handleCloseDialog();
  //   } catch (error) {
  //     console.error("Error saving places:", error);
  //   }
  // };

  const handleSavePlaces = async () => {
    try {
      if (selectedPlaces.length === 0) {
        alert("Please select at least one place.");
        return;
      }
  
      for (const place of selectedPlaces) {
        const formData = new FormData();
        formData.append("packagebody_details", packagebodyDetails.trim() || "Very nice");
        formData.append("place_id", place._id);
        formData.append("packagehead_id", selectedPackageId);
  
        console.log("Sending Data:", Object.fromEntries(formData.entries())); // Debugging
  
        await axios.post("http://127.0.0.1:8000/packagebody", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
  toast.success("Place added successfully!");
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving places:", error.response ? error.response.data : error.message);
    }
  };



  const handleOpenImageDialog = async (pkg) => {
    setSelectedPackageId(pkg._id);
    setOpenImageDialog(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/packagebodies/${pkg._id}`);
      setPackageBodies(response.data);
    } catch (error) {
      console.error("Error fetching package bodies:", error);
    }
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
    setGalleryData({ packagebody_id: "", gallery_file: null, gallery_description: "" });
  };
  const handleUploadImage = async () => {
    if (!galleryData.packagebody_id || !galleryData.gallery_file) {
      toast.error("Please select a place and upload an image.");
      return;
    }
  
    const formData = new FormData();
    formData.append("packagebody_id", galleryData.packagebody_id);
    formData.append("gallery_file", galleryData.gallery_file);
    formData.append("gallery_description", galleryData.gallery_description);
  
    try {
      await axios.post("http://127.0.0.1:8000/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Image uploaded successfully!");
      handleCloseImageDialog();
    } catch (error) {
      console.error("Error uploading image:", error.response ? error.response.data : error.message);
      toast.error("Failed to upload image.");
    }
  };
  

  return (
    <div className={Styles.container}>
      <Navbar />
      <div className={Styles.contentWrapper}>
        <Sidebar />
        <div className={Styles.mainContent}>
          <h1 className={Styles.title}>Packages</h1>
          <div className={Styles.grid}>
            {packages.map((pkg) => (
              <Card key={pkg._id} className={Styles.packageCard}>
                <motion.div className={Styles.carouselContainer}>
                  <motion.div className={Styles.carousel} drag="x" dragConstraints={{ left: -300, right: 0 }}>
                    {pkg.package_bodies.flatMap((body) => body.gallery).map((img, index) => (
                      <motion.img key={index} src={img.gallery_file} className={Styles.packageImage} />
                    ))}
                  </motion.div>
                </motion.div>

                <div className={Styles.packageInfo}>
                  <h2>{pkg.packagehead_name}</h2>
                  <p>Days: {pkg.packagehead_days}</p>
                  <p>Rooms: {pkg.packagehead_room_count}</p>
                  <p>Status: {pkg.packagehead_status}</p>

                  <div className={Styles.placesContainer}>
                    {pkg.package_bodies.map((body, i) => (
                      <Chip key={i} label={body.place.place_name} className={Styles.placeChip} />
                    ))}
                  </div>
                </div>

                <div className={Styles.actions}>
                  <Button onClick={() => handleOpenDialog(pkg)}>Add Place</Button>
                  <Button onClick={() => handleOpenImageDialog(pkg)}>Add Images</Button>

                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Dialog Box for Adding Places */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Select Places to Add</DialogTitle>
        <DialogContent>
          <TextField
            label="Package Body Details"
            fullWidth
            multiline
            rows={2}
            value={packagebodyDetails}
            onChange={(e) => setPackagebodyDetails(e.target.value)}
            margin="normal"
          />

          {/* Autocomplete dropdown for places */}
          <Autocomplete
            multiple
            options={places.filter((place) => !alreadySelectedPlaces.includes(place._id))}
            getOptionLabel={(option) => option.place_name}
            value={selectedPlaces}
            onChange={(event, newValue) => setSelectedPlaces(newValue)}
            renderInput={(params) => <TextField {...params} label="Select Places" placeholder="Add places" />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSavePlaces} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

     {/* Dialog Box for Adding Images */}
     <Dialog open={openImageDialog} onClose={handleCloseImageDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add Image to Package</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={packageBodies}
            // getOptionLabel={(option) => option.place.place_name}
            getOptionLabel={(option) => (option.place ? option.place.place_name : "Unknown Place")}

            value={packageBodies.find((pb) => pb._id === galleryData.packagebody_id) || null}
            onChange={(event, newValue) =>
              setGalleryData({ ...galleryData, packagebody_id: newValue ? newValue._id : "" })
            }
            renderInput={(params) => <TextField {...params} label="Select Place" placeholder="Choose a place" />}
          />
          <TextField
            label="Gallery Description"
            fullWidth
            multiline
            rows={2}
            value={galleryData.gallery_description}
            onChange={(e) => setGalleryData({ ...galleryData, gallery_description: e.target.value })}
            margin="normal"
          />
          <input type="file" onChange={(e) => setGalleryData({ ...galleryData, gallery_file: e.target.files[0] })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImageDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleUploadImage}>
  Upload
</Button>

        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Packages;
