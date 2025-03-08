import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Styles from './View.module.scss'; // Import SCSS Module
import StarRateIcon from '@mui/icons-material/StarRate';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BedIcon from '@mui/icons-material/Bed';
import GroupsIcon from '@mui/icons-material/Groups';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HotelIcon from '@mui/icons-material/Hotel';

const View = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const packageId = queryParams.get('package_id');

    const [packageDetails, setPackageDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (packageId) {
            fetchPackageDetails();
        }
    }, [packageId]);

    const fetchPackageDetails = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/package/${packageId}`);
            console.log("Backend Response:", response.data);
            setPackageDetails(response.data);
        } catch (err) {
            setError('Failed to fetch package details.');
        } finally {
            setLoading(false);
        }
    };

    // Handle booking action
    const handleBooking = () => {
        // Example: Navigate to a booking page with package ID
        navigate(`/booking?package_id=${packageId}`);
    };

    // Carousel settings
    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    if (loading) return <p className={Styles.loading}>Loading...</p>;
    if (error) return <p className={Styles.error}>{error}</p>;
    if (!packageDetails) return <p className={Styles.noData}>No package details available.</p>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={Styles.packageContainer}
        > 


            {/* Gallery Carousel */}
            {packageDetails.all_gallery_images && packageDetails.all_gallery_images.length > 0 && (
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className={Styles.gallery}
                >
                    <h2 className={Styles.sectionTitle}>Gallery</h2>
                    <Slider {...carouselSettings}>
                        {packageDetails.all_gallery_images.map((img, index) => (
                            <div key={index} className={Styles.carouselItem}>
                                <img src={img} alt={`Gallery ${index}`} className={Styles.galleryImage} />
                            </div>
                        ))}
                    </Slider>
                </motion.div>
            )}

            {/* Package Header */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className={Styles.packageHeader}
            >
                <h1 className={Styles.packageTitle}>{packageDetails.package_name}</h1>
                <div className={Styles.packageMeta}>
                    <div className={Styles.metaItem}>
                        <WbSunnyIcon className={Styles.icon} />
                        <span>{packageDetails.package_days} Days</span>
                    </div>
                    <div className={Styles.metaItem}>
                        <BedIcon className={Styles.icon} />
                        <span>{packageDetails.package_room_count} Rooms</span>
                    </div>
                    <div className={Styles.metaItem}>
                        <GroupsIcon className={Styles.icon} />
                        <span>Traveller Count {packageDetails.package_count}</span>
                    </div>
                    <div className={Styles.metaItem}>
                        <StarRateIcon className={Styles.icon} />
                        <span>4.5/5 Rating</span>
                    </div>
                </div>
                <div className={Styles.priceBooking}>
                    <div className={Styles.price}>
                        <AttachMoneyIcon className={Styles.icon} />
                        <span>₹{packageDetails.package_price}</span>
                    </div>
                    <button className={Styles.bookButton} onClick={handleBooking}>
                        Book Now
                    </button>
                </div>
            </motion.div>

            {/* Package Details */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={Styles.packageDetails}
            >
                <h2 className={Styles.sectionTitle}>Package Overview</h2>
                <p className={Styles.packageDescription}>{packageDetails.package_details}</p>
            </motion.div>

            {/* Hotel Info */}
            {packageDetails.hotel && typeof packageDetails.hotel === "object" && (
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className={Styles.hotelInfo}
                >
                    <h2 className={Styles.sectionTitle}>Hotel Details</h2>
                    <div className={Styles.hotelGrid}>
                        <div className={Styles.hotelDetails}>
                            <p><HotelIcon className={Styles.icon} /> <strong>{packageDetails.hotel.hotel_name}</strong></p>
                            <p><strong>Address:</strong> {packageDetails.hotel.hotel_address}</p>
                            <p><strong>Email:</strong> {packageDetails.hotel.hotel_email}</p>
                        </div>
                        <div className={Styles.hotelImageWrapper}>
                            <img src={packageDetails.hotel.hotel_photo} alt="Hotel" className={Styles.hotelImage} />
                        </div>
                    </div>
                </motion.div>
            )}


            {/* Package Itinerary */}
            {packageDetails.package_bodies && packageDetails.package_bodies.length > 0 && (
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className={Styles.packageBodies}
                >
                    <h2 className={Styles.sectionTitle}>Places</h2>
                    {packageDetails.package_bodies.map((body, index) => (
                        <div key={body.packagebody_id} className={Styles.packageBody}>
                            <h3 className={Styles.dayTitle}>{body.place_name} </h3>
                            <p className={Styles.bodyDescription}>{body.description}</p>
                            {body.images.length > 0 && (
                                <div className={Styles.bodyImages}>
                                    {body.images.map((img, idx) => (
                                        <img key={idx} src={img} alt={`Day ${index + 1} Image ${idx}`} className={Styles.bodyImage} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};

export default View;