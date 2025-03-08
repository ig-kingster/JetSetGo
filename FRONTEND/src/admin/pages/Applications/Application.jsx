import React, { useEffect, useState } from 'react';
import Styles from './Application.module.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  CheckCircle, 
  Cancel, 
  Visibility, 
  Hotel, 
  Business, 
  Email, 
  MeetingRoom 
} from '@mui/icons-material';

const Application = () => {
    const [hotels, setHotels] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchPendingHotels = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/pending');
                 const data = response.data;
                 const pendingarray = Array.isArray(data) ? data : [data];

                setHotels(pendingarray);
                console.log(pendingarray);
            } catch (error) {
                console.error('Error fetching hotels:', error);
                toast.error('Failed to load applications');
            }
        };
        fetchPendingHotels();
    }, []);

    const handleAction = async (hotel_id, action) => {
        try {
            console.log(`API Request: http://127.0.0.1:8000/status/${action}/${hotel_id}`);
            await axios.post(`http://127.0.0.1:8000/status/${action}/${hotel_id}`);

            setHotels(hotels.filter(hotel => hotel.hotel_id !== hotel_id));
            toast.success(`Hotel ${action === 'accept' ? 'approved' : 'rejected'} successfully`);
        } catch (error) {
            console.error(`Error ${action}ing hotel:`, error);
            toast.error(`Failed to ${action} hotel`);
        }
    };

    const filteredHotels = hotels.filter(hotel =>
        hotel.hotel_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.hotel_email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedHotels = filteredHotels.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const renderHotelDetails = (hotel) => (
        <div className={Styles.hotelCard}>
            <div className={Styles.cardHeader}>
                <img src={hotel.hotel_photo} alt="Hotel" className={Styles.hotelImage} />
                <div className={Styles.hotelMeta}>
                    <h3>{hotel.hotel_name}</h3>
                    <span className={Styles.hotelId}>ID: {hotel._id}</span>
                </div>
            </div>
            
            <div className={Styles.cardBody}>
                <div className={Styles.detailItem}>
                    <Email className={Styles.detailIcon} />
                    <span>{hotel.hotel_email}</span>
                </div>
                
                <div className={Styles.detailItem}>
                    <Business className={Styles.detailIcon} />
                    <span>{hotel.hotel_address}</span>
                </div>
                
                <div className={Styles.detailItem}>
                    <MeetingRoom className={Styles.detailIcon} />
                    <span>{hotel.hotel_room_count} Rooms</span>
                </div>
                
                <div className={Styles.proofSection}>
                    <a 
                        href={hotel.hotel_proof} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={Styles.proofLink}
                    >
                        <Visibility className={Styles.proofIcon} />
                        View Legal Documents
                    </a>
                </div>
            </div>
            
            <div className={Styles.cardActions}>
                <button 
                    className={Styles.acceptButton}
                    onClick={() => handleAction(hotel._id, 'accept')}
                >
                    <CheckCircle />
                    Approve
                </button>
                <button 
                    className={Styles.rejectButton}
                    onClick={() => handleAction(hotel._id, 'reject')}
                >
                    <Cancel />
                    Reject
                </button>
            </div>
        </div>
    );

    return (
      <div className={Styles.main}>
            <Navbar />

        <div className={Styles.container}>

        <Sidebar />

            <div className={Styles.content}>
                
                <div className={Styles.header}>
                    <h1>
                        <Hotel className={Styles.headerIcon} />
                        Hotel Applications
                        <span className={Styles.countBadge}>{filteredHotels.length}</span>
                    </h1>
                    
                    <div className={Styles.controls}>
                        <div className={Styles.searchBar}>
                            <input
                                type="text"
                                placeholder="Search hotels..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

             
                        <div className={Styles.hotelGrid}>
                            {paginatedHotels.length > 0 ? (
                                paginatedHotels.map(hotel => renderHotelDetails(hotel))
                            ): (
                                <div className={Styles.emptyState}>
                                    <img src="/empty-applications.svg" alt="No applications" />
                                    <p>No pending hotel applications found</p>
                                </div>
                            )}
                        </div>

                        <div className={Styles.pagination}>
                            {Array.from({ length: Math.ceil(filteredHotels.length / itemsPerPage) }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={currentPage === i + 1 ? Styles.activePage : ''}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
            </div>
            </div>
      </div>


    );
};

export default Application;