import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Styles from "./Dashboard.module.scss";
import Navbar from "../../components/navbar/Navbar";
import { 
  Bed, 
  MonetizationOn, 
  People, 
  CalendarToday,
  BarChart,
  Receipt,
  Hotel,
  LocalActivity 
} from "@mui/icons-material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', bookings: 4000 },
  { name: 'Feb', bookings: 3000 },
  { name: 'Mar', bookings: 5000 },
  { name: 'Apr', bookings: 2780 },
  { name: 'May', bookings: 1890 },
  { name: 'Jun', bookings: 2390 },
];

const Dashboard = () => {
  return (
    <div className={Styles.container}>
      <Navbar/>  
      <div className={Styles.dashboardWrapper}>
        <Sidebar />
        <div className={Styles.dashboardContent}>
          {/* Header */}
          <div className={Styles.header}>
            <h1>Hotel Dashboard</h1>
            <div className={Styles.statsOverview}>
              <div className={Styles.statCard}>
                <Bed className={Styles.icon} />
                <div>
                  <h3>Total Rooms</h3>
                  <p>120</p>
                </div>
              </div>
              <div className={Styles.statCard}>
                <MonetizationOn className={Styles.icon} />
                <div>
                  <h3>Monthly Revenue</h3>
                  <p>$45,230</p>
                </div>
              </div>
              <div className={Styles.statCard}>
                <People className={Styles.icon} />
                <div>
                  <h3>Occupancy Rate</h3>
                  <p>85%</p>
                </div>
              </div>
              <div className={Styles.statCard}>
                <CalendarToday className={Styles.icon} />
                <div>
                  <h3>Pending Requests</h3>
                  <p>24</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={Styles.mainContent}>
            {/* Chart Section */}
            <div className={Styles.chartSection}>
              <h2>Monthly Bookings Overview</h2>
              <div className={Styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="bookings" 
                      stroke="#0e7c7b" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className={Styles.recentBookings}>
              <h2>Recent Reservations</h2>
              <div className={Styles.bookingList}>
                <table>
                  <thead>
                    <tr>
                      <th>Guest</th>
                      <th>Check-In</th>
                      <th>Status</th>
                      <th>Room</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1,2,3,4,5].map((item) => (
                      <tr key={item}>
                        <td>John Smith</td>
                        <td>2024-03-15</td>
                        <td><span className={Styles.confirmed}>Confirmed</span></td>
                        <td>Deluxe Suite</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={Styles.quickActions}>
              <h2>Quick Actions</h2>
              <div className={Styles.actionGrid}>
                <button className={Styles.actionCard}>
                  <Hotel className={Styles.actionIcon} />
                  New Booking
                </button>
                <button className={Styles.actionCard}>
                  <Bed className={Styles.actionIcon} />
                  Check-In
                </button>
                <button className={Styles.actionCard}>
                  <Receipt className={Styles.actionIcon} />
                  Generate Report
                </button>
                <button className={Styles.actionCard}>
                  <LocalActivity className={Styles.actionIcon} />
                  Manage Rooms
                </button>
              </div>
            </div>

            {/* Occupancy Rate */}
            <div className={Styles.occupancySection}>
              <h2>Occupancy by Room Type</h2>
              <div className={Styles.occupancyBars}>
                <div className={Styles.barItem}>
                  <span>Deluxe Suite</span>
                  <div className={Styles.barContainer}>
                    <div className={Styles.barFill} style={{ width: '85%' }}></div>
                  </div>
                  <span>85%</span>
                </div>
                <div className={Styles.barItem}>
                  <span>Family Room</span>
                  <div className={Styles.barContainer}>
                    <div className={Styles.barFill} style={{ width: '72%' }}></div>
                  </div>
                  <span>72%</span>
                </div>
                <div className={Styles.barItem}>
                  <span>Single Room</span>
                  <div className={Styles.barContainer}>
                    <div className={Styles.barFill} style={{ width: '68%' }}></div>
                  </div>
                  <span>68%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;