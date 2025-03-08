import React from 'react';
import Styles from './HotelProfile.module.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import Navbar from '../../components/navbar/Navbar';

const HotelProfile = () => {
    const hotel = {
        name: 'Amulya Hotel',
        location: 'Jaipur, India',
        rating: 4.5,
        totalPackages: 20,
        totalBookings: 150,
        profileImage: 'https://img.easemytrip.com/EMTHotel-345175/23/na/l/287218_0.jpg',
        coverImage: 'https://media.easemytrip.com/media/Deal/DL638473471675148704/SightSeeing/SightSeeing5S3uPQ.jpg'
    };

    const packages = [
        { id: 1, image: 'https://cdn.pixabay.com/photo/2023/05/01/06/55/waterfall-7962263_1280.jpg', title: 'Luxury Stay', price: '₹10,000' },
        { id: 2, image: 'https://cdn.pixabay.com/photo/2019/08/10/03/15/bridge-4396131_1280.jpg', title: 'Weekend Getaway', price: '₹7,500' },
        { id: 3, image: 'https://cdn.pixabay.com/photo/2023/10/11/13/41/ship-8308680_1280.jpg', title: 'Family Retreat', price: '₹15,000' },
        { id: 4, image: 'https://cdn.pixabay.com/photo/2021/11/29/17/32/city-6833167_1280.jpg', title: 'Honeymoon Special', price: '₹20,000' },
    ];

    return (
        <div className={Styles.container}>
            <Navbar/>
            {/* Cover Image */}
            <div className={Styles.coverImage}>
                <img src={hotel.coverImage} alt="Cover" />
            </div>

            {/* Profile Info */}
            <div className={Styles.profileSection}>
                <img src={hotel.profileImage} className={Styles.profileImage} alt="Hotel Profile" />
                <div className={Styles.details}>
                    <h2>{hotel.name}</h2>
                    <p><LocationOnIcon /> {hotel.location}</p>
                    <p><StarIcon /> {hotel.rating}</p>
                </div>
                <div className={Styles.stats}>
                    <div>
                        <span>{hotel.totalPackages}</span>
                        <p>Packages</p>
                    </div>
                    <div>
                        <span>{hotel.totalBookings}</span>
                        <p>Bookings</p>
                    </div>
                </div>
            </div>

            {/* Packages Grid */}
            <div className={Styles.packagesGrid}>
                {packages.map(pkg => (
                    <div key={pkg.id} className={Styles.packageCard}>
                        <img src={pkg.image} alt={pkg.title} />
                        <h3>{pkg.title}</h3>
                        <p>{pkg.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotelProfile;
