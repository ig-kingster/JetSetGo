import React, { useState } from 'react';
import Styles from './Main.module.scss';
import { 
  Schedule, 
  Cancel, 
  CheckCircle, 
  Warning, 
  Search, 
  Place, 
  Flight, 
  DateRange,
  Person,
  Receipt
} from '@mui/icons-material';

const fakeData = {
  Upcoming: [
    { 
      id: 1, 
      image: 'https://source.unsplash.com/random/800x600?mountain', 
      price: '$200', 
      from: 'New York', 
      to: 'Los Angeles', 
      purchaseDate: '2024-02-01', 
      guide: 'John Doe',
      status: 'Upcoming',
      date: '2024-03-15',
      travelers: 2
    },
  ],
  Cancelled: [
    { 
      id: 2, 
      image: 'https://source.unsplash.com/random/800x600?beach', 
      price: '$150', 
      from: 'Chicago', 
      to: 'Miami', 
      purchaseDate: '2024-01-15', 
      guide: 'Jane Smith',
      status: 'Cancelled',
      date: '2024-02-20',
      travelers: 4
    },
  ],
  Completed: [
    { 
      id: 3, 
      image: 'https://source.unsplash.com/random/800x600?city', 
      price: '$300', 
      from: 'San Francisco', 
      to: 'Seattle', 
      purchaseDate: '2023-12-20', 
      guide: 'Mike Johnson',
      status: 'Completed',
      date: '2023-12-28',
      travelers: 3
    },
  ],
  Unsuccessful: [  
    { 
      id: 4, 
      image: 'https://source.unsplash.com/random/800x600?forest', 
      price: '$180', 
      from: 'Boston', 
      to: 'Austin', 
      purchaseDate: '2023-11-05', 
      guide: 'Sarah Wilson',
      status: 'Unsuccessful',
      date: '2023-11-20',
      travelers: 2
    },
  ],
};

const Main = () => {
  const [selectedTab, setSelectedTab] = useState('Upcoming');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Upcoming': return <Schedule className={Styles.statusIcon} />;
      case 'Cancelled': return <Cancel className={Styles.statusIcon} />;
      case 'Completed': return <CheckCircle className={Styles.statusIcon} />;
      default: return <Warning className={Styles.statusIcon} />;
    }
  };

  const filteredData = fakeData[selectedTab].filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase()))
  );
  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <h1>Travel Bookings</h1>
        <div className={Styles.searchBar}>
          <Search className={Styles.searchIcon} />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={Styles.navTabs}>
        {Object.keys(fakeData).map((tab) => (
          <button
            key={tab}
            className={`${Styles.tab} ${selectedTab === tab ? Styles.active : ''}`}
            onClick={() => setSelectedTab(tab)}
          >
            {getStatusIcon(tab)}
            <span>{tab}</span>
            <span className={Styles.badge}>{fakeData[tab].length}</span>
          </button>
        ))}
      </div>

      <div className={Styles.bookingContainer}>
        {filteredData.length > 0 ? (
          <div className={Styles.bookingGrid}>
            {filteredData.map((booking) => (
              <div key={booking.id} className={`${Styles.bookingCard} ${Styles[booking.status.toLowerCase()]}`}>
                <div className={Styles.cardHeader}>
                  <img src={booking.image} alt="Destination" />
                  <div className={Styles.priceTag}>{booking.price}</div>
                  <div className={Styles.statusBadge}>
                    {getStatusIcon(booking.status)}
                    {booking.status}
                  </div>
                </div>
                <div className={Styles.cardBody}>
                  <div className={Styles.route}>
                    <Flight className={Styles.routeIcon} />
                    <span>{booking.from}</span>
                    <div className={Styles.divider}></div>
                    <span>{booking.to}</span>
                  </div>
                  
                  <div className={Styles.detailItem}>
                    <DateRange className={Styles.detailIcon} />
                    <span>Travel Date: {booking.date}</span>
                  </div>
                  
                  <div className={Styles.detailItem}>
                    <Person className={Styles.detailIcon} />
                    <span>Travelers: {booking.travelers}</span>
                  </div>
                  
                  <div className={Styles.detailItem}>
                    <Place className={Styles.detailIcon} />
                    <span>Guide: {booking.guide}</span>
                  </div>
                  
                  <div className={Styles.actions}>
                    <button className={Styles.actionButton}>
                      <Receipt />
                      Invoice
                    </button>
                    <button className={Styles.actionButton}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={Styles.emptyState}>
            <img src="/empty-bookings.svg" alt="No bookings found" />
            <h3>No {selectedTab.toLowerCase()} bookings found</h3>
            <p>{searchTerm ? 'Try adjusting your search' : 'Start planning your next adventure!'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;