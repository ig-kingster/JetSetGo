import React, { useEffect, useState } from 'react';
import Styles from './TopPackage.module.scss';
import EastIcon from '@mui/icons-material/East';
import { Link } from 'react-router-dom';
import axios from "axios";

const TopPackage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/packagelist");
      console.log("API Response:", response.data); // Debugging
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.sub}>
        <div className={Styles.heads}>
          <span className={Styles.head}>Top </span>
          <span> Packages</span>
        </div>
        <div className={Styles.layout}>
          {packages.map((pkg) => (
            <div key={pkg._id} className={Styles.package}>
              <div className={Styles.packageimage}>
                {/* Display All Images from the Gallery */}
                {pkg.images.length > 0 ? (
                  pkg.images.map((img, index) => (
                    <img key={index} src={img} alt={pkg.package_name} className={Styles.img} />
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>
              <div className={Styles.packageinfo}>
                <div className={Styles.packagename}>
                  <span>{pkg.package_name}</span>
                </div>
                <div className={Styles.pkginfo}>
                  <div className={Styles.packageprice}>
                    <span>Price: {pkg.package_price}</span>
                  </div>
                  <div className={Styles.explore}>
                    <div className={Styles.exploretxt}><span>Explore</span></div>
                    <div className={Styles.exploreicon}>
                      <Link to={'./viewmore'}><EastIcon /></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPackage;
