import React, { useState, useEffect } from "react";
import Styles from "./Guides.module.scss"; // SCSS module
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

// Mock API function to fetch guides
const fetchGuides = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          guide_id: 1,
          guide_name: "John Doe",
          guide_email: "john.doe@example.com",
          guide_phone_number: 1234567890,
          guide_proof: "Aadhar Card",
          guide_photo: "/images/john.jpg",
          guide_status: "Active",
          guide_password: "password123",
          hotel_id: 1,
        },
        {
          guide_id: 2,
          guide_name: "Jane Smith",
          guide_email: "jane.smith@example.com",
          guide_phone_number: 9876543210,
          guide_proof: "Passport",
          guide_photo: "/images/jane.jpg",
          guide_status: "Inactive",
          guide_password: "password456",
          hotel_id: 2,
        },
      ]);
    }, 1000); // Simulated delay
  });
};

// Mock API function to delete a guide
const deleteGuide = (guide_id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: `Guide ${guide_id} deleted successfully!` });
    }, 1000); // Simulated delay
  });
};

const Guides = () => {
  const [guides, setGuides] = useState([]);

  // Fetch guides on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGuides();
        setGuides(data);
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };
    fetchData();
  }, []);

  // Handle guide deletion
  const handleDelete = async (guide_id) => {
    try {
      const response = await deleteGuide(guide_id);
      alert(response.message);
      setGuides((prev) => prev.filter((guide) => guide.guide_id !== guide_id));
    } catch (error) {
      console.error("Error deleting guide:", error);
    }
  };

  return (
    <div className={Styles.navbar}>
      <Navbar/>  
    <div className={Styles.main}>
<Sidebar/>
    <div className={Styles.guidesContainer}>
      <h1>Guides Management</h1>
      <div className={Styles.guidesList}>
        {guides.map((guide) => (
          <div key={guide.guide_id} className={Styles.guideCard}>
            <div className={Styles.guidePhoto}>
              <img src={guide.guide_photo} alt={guide.guide_name} />
            </div>
            <div className={Styles.guideDetails}>
              <h2>{guide.guide_name}</h2>
              <p>Email: {guide.guide_email}</p>
              <p>Phone: {guide.guide_phone_number}</p>
              <p>Proof: {guide.guide_proof}</p>
              <p>Status: {guide.guide_status}</p>
              <p>Hotel ID: {guide.hotel_id}</p>
            </div>
            <div className={Styles.actions}>
              <button
                className={Styles.editButton}
                onClick={() => alert(`Edit guide ${guide.guide_id}`)}
              >
                Edit
              </button>
              <button
                className={Styles.deleteButton}
                onClick={() => handleDelete(guide.guide_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
</div>
  );
};

export default Guides;