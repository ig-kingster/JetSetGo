// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Styles from "./Packageadd.module.scss";
// import Navbar from "../../components/navbar/Navbar";
// import { Hotel } from "@mui/icons-material";
// import { Autocomplete, TextField } from "@mui/material";

// const hid = sessionStorage.getItem("hid");

// const Packageadd = () => {
//     // State for Package Head
//     const [packageHeadData, setPackageHeadData] = useState({
//         packagehead_name: "",
//         packagehead_days: "",
//         packagehead_price: "",
//         packagehead_details: "",
//         packagehead_status: "",
//         packagehead_count: "",
//         packagehead_room_count: "",
//     });

//     // State for Package Body
//     const [packageBodyData, setPackageBodyData] = useState({
//         packagebody_details: "",
//         place_id: "",
//         packagehead_id: "",
//     });

//     // State for Gallery
//     const [galleryData, setGalleryData] = useState({
//         gallery_file: null,
//         gallery_description: "",
//         packagebody_id: "",
//     });

//     // State for managing UI flow
//     const [isPackageHeadCreated, setIsPackageHeadCreated] = useState(false);
//     const [selectedPlaces, setSelectedPlaces] = useState([]);
//     const [availablePlaces, setAvailablePlaces] = useState([]);

//     // Fetch available places from API
//     useEffect(() => {
//         const fetchPlaces = async () => {
//             try {
//                 const response = await axios.get("http://127.0.0.1:8000/placesadd");
//                 setAvailablePlaces(response.data);
//             } catch (error) {
//                 console.error("Error fetching places:", error);
//                 toast.error("Failed to fetch places");
//             }
//         };
//         fetchPlaces();
//     }, []);

//     // Handle Package Head Submission
//     const handlePackageHeadSubmit = async (e) => {
//         e.preventDefault();
//         const data = new FormData();
//         Object.keys(packageHeadData).forEach(key => {
//             data.append(key, packageHeadData[key]);
//         });

//         try {
//             const response = await axios.post(`http://127.0.0.1:8000/packagehead/${hid}`, data);
//             setPackageBodyData({ ...packageBodyData, packagehead_id: response.data.packagehead_id });
//             setIsPackageHeadCreated(true);

//             toast.success("Package Head added successfully");
//             console.log(response.data);
//         } catch (error) {
//             console.error("Error adding Package Head:", error);
//             toast.error("Failed to add Package Head");
//         }
//     };

//     // Handle Adding a Place to Package Body
//     const handlePlaceAdd = async (e) => {
//         e.preventDefault();
//         if (!packageBodyData.place_id) {
//             toast.error("Please select a place.");
//             return;
//         }

//         const data = new FormData();
//         data.append("packagebody_details", packageBodyData.packagebody_details);
//         data.append("place_id", packageBodyData.place_id);
//         data.append("packagehead_id", packageBodyData.packagehead_id);

//         try {
//             const response = await axios.post("http://127.0.0.1:8000/packagebody", data);
//             const selectedPlace = availablePlaces.find(
//                 place => place._id === packageBodyData.place_id
//             );

//             setSelectedPlaces([...selectedPlaces, {
//                 ...selectedPlace,
//                 packagebody_id: response.data.packagebody_id
//             }]);

//             setPackageBodyData({
//                 ...packageBodyData,
//                 place_id: "",
//                 packagebody_details: ""

//             });
//             toast.success("Place added successfully");
//         } catch (error) {
//             console.error("Error adding place:", error);
//             toast.error("Failed to add place");
//         }
//     };

//     // Handle Gallery Submission
//     const handleGallerySubmit = async (e) => {
//         e.preventDefault();
//         if (!galleryData.gallery_file || !galleryData.gallery_description) {
//             toast.error("Please fill all fields in the gallery form.");
//             return;
//         }

//         const data = new FormData();
//         data.append("gallery_file", galleryData.gallery_file);
//         data.append("gallery_description", galleryData.gallery_description);
//         data.append("packagebody_id", galleryData.packagebody_id);

//         try {
//             await axios.post("http://127.0.0.1:8000/gallery", data);
//             toast.success("Gallery data added successfully");
//             setGalleryData({
//                 gallery_file: null,
//                 gallery_description: "",
//                 packagebody_id: ""
//             });
//         } catch (error) {
//             console.error("Error adding gallery data:", error);
//             toast.error("Failed to add gallery data");
//         }
//     };

//     // Handle Input Changes
//     const handleChange = (e, formType) => {
//         const { name, value } = e.target;
//         if (formType === "head") {
//             setPackageHeadData({ ...packageHeadData, [name]: value });
//         } else if (formType === "body") {
//             setPackageBodyData({ ...packageBodyData, [name]: value });
//         }
//     };

//     return (
//         <div className={Styles.container}>
//             <Navbar />
//             <div className={Styles.dashboardWrapper}>
//                 <Sidebar />
//                 <div className={Styles.mainContent}>
//                     <div className={Styles.header}>
//                         <h1><Hotel /> Create Travel Package</h1>
//                     </div>
//                     <div className={Styles.formContainer}>
//                         {/* Package Head Form */}
//                         {!isPackageHeadCreated && (
//                             <form onSubmit={handlePackageHeadSubmit} className={Styles.packageForm}>
//                                 <h2>Package Head</h2>
//                                 <div className={Styles.formGroup}>
//                                     <label>Package Name</label>
//                                     <input
//                                         type="text"
//                                         name="packagehead_name"
//                                         placeholder="Enter name of package"
//                                         value={packageHeadData.packagehead_name}
//                                         onChange={(e) => handleChange(e, "head")}
//                                         required
//                                     />
//                                 </div>
//                                 <div className={Styles.formGroup}>
//                                     <label>Days</label>
//                                     <input
//                                         type="number"
//                                         name="packagehead_days"
//                                         placeholder="Enter number of days"
//                                         value={packageHeadData.packagehead_days}
//                                         onChange={(e) => handleChange(e, "head")}
//                                         required
//                                     />
//                                 </div>
//                                 <div className={Styles.formGroup}>
//                                     <label>Price ($)</label>
//                                     <input
//                                         type="number"
//                                         name="packagehead_price"
//                                         placeholder="Enter package price"
//                                         value={packageHeadData.packagehead_price}
//                                         onChange={(e) => handleChange(e, "head")}
//                                         required
//                                     />
//                                 </div>
//                                 <div className={Styles.formGroup}>
//                                     <label>Details</label>
//                                     <textarea
//                                         name="packagehead_details"
//                                         placeholder="Enter package details"
//                                         value={packageHeadData.packagehead_details}
//                                         onChange={(e) => handleChange(e, "head")}
//                                         required
//                                     />
//                                 </div>
//                                 <div className={Styles.formGroup}>
//                                     <label>Status</label>
//                                     <select
//                                         name="packagehead_status"
//                                         value={packageHeadData.packagehead_status}
//                                         onChange={(e) => handleChange(e, "head")}
//                                         required
//                                     >
//                                         <option value="">Select Status</option>
//                                         <option value="Active">Active</option>
//                                         <option value="Inactive">Inactive</option>
//                                     </select>
//                                 </div>
//                                 <div className={Styles.formGroup}>
//                                     <label>Package Count</label>
//                                     <input
//                                         type="number"
//                                         name="packagehead_count"
//                                         placeholder="Enter package count"
//                                         value={packageHeadData.packagehead_count}
//                                         onChange={(e) => handleChange(e, "head")}
//                                         required
//                                     />
//                                 </div>
//                                 <div className={Styles.formGroup}>
//                                     <label>Room Count</label>
//                                     <input
//                                         type="number"
//                                         name="packagehead_room_count"
//                                         placeholder="Enter room count"
//                                         value={packageHeadData.packagehead_room_count}
//                                         onChange={(e) => handleChange(e, "head")}
//                                         required
//                                     />
//                                 </div>
//                                 <button type="submit" className={Styles.submitButton}>
//                                     Create Package Head
//                                 </button>
//                             </form>
//                         )}

//                         {/* Package Body Form */}
//                         {isPackageHeadCreated && (
//                             <form onSubmit={handlePlaceAdd} className={Styles.packageForm}>
//                                 <h2>Package Body</h2>
//                                 <div className={Styles.formGroup}>
//                                     <label>Details</label>
//                                     <textarea
//                                         name="packagebody_details"
//                                         value={packageBodyData.packagebody_details}
//                                         onChange={(e) => handleChange(e, "body")}
//                                         required
//                                     />
//                                 </div>
//                                 <div className={Styles.formGroup}>
//                                     <label>Select Place</label>
//                                     <Autocomplete
//                                         options={availablePlaces}
//                                         getOptionLabel={(option) => option.place_name || "Unknown"}
//                                         renderInput={(params) => <TextField {...params} label="Select Place" />}
//                                         onChange={(event, newValue) => {
//                                             if (newValue) {
//                                                 setPackageBodyData({ ...packageBodyData, place_id: newValue._id });
//                                             }
//                                         }}
//                                     />
//                                 </div>
//                                 <button type="submit" className={Styles.submitButton}>
//                                     Add Place
//                                 </button>
//                             </form>
//                         )}

//                         {/* Selected Places */}
//                         {selectedPlaces.length > 0 && (
//                             <div className={Styles.selectedPlaces}>
//                                 <h3>Selected Places</h3>
//                                 <ul>
//                                     {selectedPlaces.map((place, index) => (
//                                         <li key={index}>
//                                             {place.place_name} (ID: {place._id})
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         )}

//                         {/* Gallery Form */}
//                         {selectedPlaces.length > 0 && (
//                             <form onSubmit={handleGallerySubmit} className={Styles.packageForm}>
//                                 <h2>Gallery</h2>
//                                 <div className={Styles.formGroup}>
//                                     <label>Select Place for Gallery</label>
//                                     {/* <select
//                                         name="packagebody_id"
//                                         value={galleryData.packagebody_id}
//                                         onChange={(e) => setGalleryData({ ...galleryData, packagebody_id: e.target.value })}
//                                         required
//                                     >
//                                         <option value="">Select Place</option>
//                                         {selectedPlaces.map((place, index) => (
//                                             <option key={index} value={place.packagebody_id}>
//                                                 {place.place_name}
//                                             </option>
//                                         ))}
//                                     </select> */}

//                                     <select
//                                         name="packagebody_id"
//                                         value={galleryData.packagebody_id}
//                                         onChange={(e) => setGalleryData({ ...galleryData, packagebody_id: e.target.value })}
//                                         required
//                                     >
//                                         <option value="">Select Package Body</option>
//                                         {selectedPlaces.map((place) => (
//                                             <option key={place.packagebody_id} value={place.packagebody_id}>
//                                                 {place.place_name} - {place.packagebody_id}
//                                             </option>
//                                         ))}
//                                     </select>




//                                 </div>
//                                 <div className={Styles.formGroup}>
//                                     <label>Gallery Image</label>
//                                     <input
//                                         type="file"
//                                         name="gallery_file"
//                                         onChange={(e) => setGalleryData({ ...galleryData, gallery_file: e.target.files[0] })}
//                                         required
//                                     />
//                                 </div>
//                                 <div className={Styles.formGroup}>
//                                     <label>Description</label>
//                                     <textarea
//                                         name="gallery_description"
//                                         value={galleryData.gallery_description}
//                                         onChange={(e) => setGalleryData({ ...galleryData, gallery_description: e.target.value })}
//                                         required
//                                     />
//                                 </div>
//                                 <button type="submit" className={Styles.submitButton}>
//                                     Add Gallery Data
//                                 </button>
//                             </form>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Packageadd;



import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../../components/sidebar/Sidebar";
import Styles from "./Packageadd.module.scss";
import Navbar from "../../components/navbar/Navbar";
import { Hotel } from "@mui/icons-material";

const hid = sessionStorage.getItem("hid");

const Packageadd = () => {
    // State for Package Head
    const [packageHeadData, setPackageHeadData] = useState({
        packagehead_name: "",
        packagehead_days: "",
        packagehead_price: "",
        packagehead_details: "",
        packagehead_status: "",
        packagehead_count: "",
        packagehead_room_count: "",
    });

    // Handle Package Head Submission
    const handlePackageHeadSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(packageHeadData).forEach(key => {
            data.append(key, packageHeadData[key]);
        });

        try {
            await axios.post(`http://127.0.0.1:8000/packagehead/${hid}`, data);
            toast.success("Package Head added successfully");
        } catch (error) {
            console.error("Error adding Package Head:", error);
            toast.error("Failed to add Package Head");
        }
    };

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPackageHeadData({ ...packageHeadData, [name]: value });
    };

    return (
        <div className={Styles.container}>
            <Navbar />
            <div className={Styles.dashboardWrapper}>
                <Sidebar />
                <div className={Styles.mainContent}>
                    <div className={Styles.header}>
                        <h1><Hotel /> Create Travel Package</h1>
                    </div>
                    <div className={Styles.formContainer}>
                        <form onSubmit={handlePackageHeadSubmit} className={Styles.packageForm}>
                            <h2>Package Head</h2>
                            <div className={Styles.formGroup}>
                                <label>Package Name</label>
                                <input
                                    type="text"
                                    name="packagehead_name"
                                    placeholder="Enter name of package"
                                    value={packageHeadData.packagehead_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={Styles.formGroup}>
                                <label>Days</label>
                                <input
                                    type="number"
                                    name="packagehead_days"
                                    placeholder="Enter number of days"
                                    value={packageHeadData.packagehead_days}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={Styles.formGroup}>
                                <label>Price ($)</label>
                                <input
                                    type="number"
                                    name="packagehead_price"
                                    placeholder="Enter package price"
                                    value={packageHeadData.packagehead_price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={Styles.formGroup}>
                                <label>Details</label>
                                <textarea
                                    name="packagehead_details"
                                    placeholder="Enter package details"
                                    value={packageHeadData.packagehead_details}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={Styles.formGroup}>
                                <label>Status</label>
                                <select
                                    name="packagehead_status"
                                    value={packageHeadData.packagehead_status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div className={Styles.formGroup}>
                                <label>Package Count</label>
                                <input
                                    type="number"
                                    name="packagehead_count"
                                    placeholder="Enter package count"
                                    value={packageHeadData.packagehead_count}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={Styles.formGroup}>
                                <label>Room Count</label>
                                <input
                                    type="number"
                                    name="packagehead_room_count"
                                    placeholder="Enter room count"
                                    value={packageHeadData.packagehead_room_count}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className={Styles.submitButton}>
                                Create Package Head
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Packageadd;