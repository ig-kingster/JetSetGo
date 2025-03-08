import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Styles from "./Editpackage.module.scss"; // Import the SCSS module
import Navbar from "../../components/navbar/Navbar";

const EditPackage = () => {
  const [packageDetails, setPackageDetails] = useState({
    title: "Beach Adventure",
    description: "A thrilling beach experience with water sports.",
    price: 500,
    availability: true,
  });

  const handleChange = (key, value) => {
    setPackageDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = () => {
    console.log("Updated Package:", packageDetails);
    alert("Package updated successfully!");
  };

  return (
    <div className={Styles.navbar}>
      <Navbar/>  
    <div className={Styles.main}>
      <Sidebar />
      <div className={Styles.sub}>
      <h2 className={Styles.title}>Edit Package</h2>

      <div className={Styles.formGroup}>
        <label>Package Title</label>
        <input
          type="text"
          value={packageDetails.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className={Styles.formGroup}>
        <label>Description</label>
        <textarea
          value={packageDetails.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div className={Styles.formGroup}>
        <label>Price ($)</label>
        <input
          type="number"
          value={packageDetails.price}
          onChange={(e) => handleChange("price", e.target.value)}
        />
      </div>

      <div className={Styles.checkboxGroup}>
        <input
          type="checkbox"
          checked={packageDetails.availability}
          onChange={(e) => handleChange("availability", e.target.checked)}
        />
        <label>Available</label>
      </div>

      <button onClick={handleUpdate} className={Styles.updateButton}>
        Update Package
      </button>
    </div>
      </div>
    </div>
  );
};

export default EditPackage;
