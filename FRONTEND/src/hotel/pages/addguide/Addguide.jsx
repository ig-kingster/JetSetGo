import React, { useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import Styles from "./Addguide.module.scss"// Import SCSS Module
import Navbar from "../../components/navbar/Navbar";

const AddGuide = () => {
  const [guideData, setGuideData] = useState({
    guideName: "",
    guideEmail: "",
    guidePhoneNumber: "",
    guideProof: "",
    guidePhoto: null,
    guideStatus: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuideData({ ...guideData, [name]: value });
  };

  const handleImageChange = (e) => {
    setGuideData({ ...guideData, guidePhoto: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Guide Data Submitted:", guideData);
    // API Call to save guide
  };

  return (
    <div className={Styles.navbar}>
      <Navbar/>  
    <div className={Styles.container}>
      
      <Sidebar />
      <div className={Styles.mainContent}>
        <h2 className={Styles.heading}>Add New Guide</h2>
        <div className={Styles.packageCard}>
          <div className={Styles.detailsSection}>
            <form onSubmit={handleSubmit}>
              <div className={Styles.info}>
                <label>Guide Name</label>
                <input
                  type="text"
                  name="guideName"
                  placeholder="Enter guide name"
                  value={guideData.guideName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={Styles.info}>
                <label>Email</label>
                <input
                  type="email"
                  name="guideEmail"
                  placeholder="Enter email"
                  value={guideData.guideEmail}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={Styles.info}>
                <label>Phone Number</label>
                <input
                  type="number"
                  name="guidePhoneNumber"
                  placeholder="Enter phone number"
                  value={guideData.guidePhoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={Styles.info}>
                <label>ID Proof</label>
                <input
                  type="text"
                  name="guideProof"
                  placeholder="Enter guide ID proof"
                  value={guideData.guideProof}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={Styles.info}>
                <label>Upload Photo</label>
                <input type="file" accept="image/*" onChange={handleImageChange} required />
              </div>

              <button type="submit" className={Styles.bookNow}>Add Guide</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default AddGuide;
