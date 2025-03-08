import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Styles from './Result.module.scss';
import EastIcon from '@mui/icons-material/East';
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Result = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('result') || '';

  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...packages];

    if (searchQuery.trim()) {
      result = result.filter(pkg =>
        pkg.package_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.package_price.toString().includes(searchQuery.toLowerCase())
      );
    }

    if (priceFilter) {
      result = result.filter(pkg => pkg.package_price <= parseInt(priceFilter));
    }

    setFilteredPackages(result);
  }, [searchQuery, priceFilter, packages]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/packagelist");
      console.log("API Response:", response.data);
      setPackages(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Slick carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.filters}>
        <select onChange={(e) => setPriceFilter(e.target.value)} className={Styles.dropdown}>
          <option value="">Filter by Price</option>
          <option value="200">Up to $200</option>
          <option value="400">Up to $400</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredPackages.length === 0 ? (
        <p className={Styles.noResults}>No results found</p>
      ) : (
        <div className={Styles.grid}>
          {filteredPackages.map((pkg) => (
            <div key={pkg._id} className={Styles.card}>
              {pkg.images.length > 0 ? (
                <Slider {...sliderSettings}>
                  {pkg.images.map((img, index) => (
                    <img key={index} src={img} alt={pkg.package_name} className={Styles.img} />
                  ))}
                </Slider>
              ) : (
                <p>No images available</p>
              )}
              <div className={Styles.info}>
                <h3 className={Styles.name}>{pkg.package_name}</h3>
                <p className={Styles.description}>{pkg.package_description}</p>
                <p className={Styles.price}>${pkg.package_price}</p>
                <Link to={`../viewmore?package_id=${pkg._id}`} className={Styles.explore}>
                  Explore <EastIcon className={Styles.arrow} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Result;
