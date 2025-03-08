import React, { useEffect, useState } from 'react';
import Styles from './Main.module.scss';
import { PersonAdd, Phone, Person, Delete, TravelExplore } from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from 'axios';

const Main = () => {
  
    const uid = sessionStorage.getItem("uid");


    const [travellers, setTravellers] = useState([]);

    useEffect(() => {
        fetchTravellers();
    }, []);

    // const fetchTravellers = async () => {
    //     try {
    //         const response = await axios.get(`http://127.0.0.1:8000/cotravellerslist/${uid}`);
    //         console.log("API Response:", response.data);  // Debugging step

    //         setTravellers(response.data);
    //         const ListArray = Array.isArray(data) ? data : [data];
    //         setTravellers(packagesArray);
    //     } catch (error) {
    //         console.error('Error fetching travellers:', error);
    //     }
    // };


    const fetchTravellers = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/cotravellerslist/${uid}`);
            console.log("API Response:", response.data); // Debugging step
        const data = response.data;

            const cotravelerArray = Array.isArray(data) ? data : [data];
            setTravellers(cotravelerArray);


        } catch (error) {
            console.error('Error fetching travellers:', error);
            setTravellers([]); // Prevent app crash
        }
    };
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [error, setError] = useState('');

    const validateNumber = (num) => /^\d{10}$/.test(num);

    const addTraveller = async () => {
        if (!name.trim() || !number.trim()) {
            setError('Please fill all fields');
            return;
        }
        if (!validateNumber(number)) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }
        try {
            const data = new FormData();
            data.append("name", name);
            data.append("number", number);
            const response = await axios.post(`http://127.0.0.1:8000/cotravellers/${uid}`, data);
            console.log(' added successful:', response.data);
             toast.success("Companion Added successfully!");
            


            setTravellers([...travellers, response.data]);
            setName('');
            setNumber('');
            setError('');
        } catch (error) {
            console.error('Error adding traveller:', error);
        }
    };



    const removeTraveller = async (id) => {
        try {
          await axios.delete(`http://127.0.0.1:8000/cotravellersdelete/${id}`);
          toast.success("Companion Removed!");
          setTravellers(travellers.filter((traveller) => traveller.id !== id));
        } catch (error) {
          console.error("Error removing traveller:", error);
        }
      };
    
    return (
        <div className={Styles.container}>
            <div className={Styles.travelCard}>
                <div className={Styles.header}>
                    <TravelExplore className={Styles.headerIcon} />
                    <h2>Travel Companions</h2>
                    <p>Add your fellow travelers for this journey</p>
                </div>

                <div className={Styles.formSection}>
                    <div className={Styles.inputGroup}>
                        <div className={Styles.inputBox}>
                            <Person className={Styles.inputIcon} />
                            <input
                                type="text"
                                placeholder="Traveler's Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={Styles.inputField}
                            />
                        </div>
                        <div className={Styles.inputBox}>
                            <Phone className={Styles.inputIcon} />
                            <input
                                type="tel"
                                placeholder="Mobile Number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                className={Styles.inputField}
                                maxLength="10"
                            />
                        </div>
                    </div>

                    {error && <div className={Styles.errorMessage}>{error}</div>}

                    <button onClick={addTraveller} className={Styles.addButton}>
                        <PersonAdd className={Styles.buttonIcon} />
                        Add Travel Companion
                    </button>
                </div>

                <div className={Styles.travelerList}>
                    <h3>
                        <span className={Styles.listCount}>{travellers.length}</span>
                        {travellers.length === 1 ? ' Travel Companion' : ' Travel Companions'}
                    </h3>

                    {travellers.length === 0 ? (
                        <div className={Styles.emptyState}>
                            <img src="/empty-travelers.svg" alt="No travelers added" />
                            <p>No companions added yet. Start adding your travel buddies!</p>
                        </div>
                    ) : (
                        travellers.map((traveller) => (
                            <div key={traveller._id} className={Styles.travelerCard}>
                                <div className={Styles.cardContent}>
                                    {/* <span className={Styles.travelerNumber}></span> */}
                                    <div className={Styles.travelerInfo}>
                                        <h4>{traveller.cotraveller_name}</h4>
                                        <p>{traveller.cotraveller_number}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeTraveller(traveller._id)}
                                    className={Styles.deleteButton}
                                >
                                    <Delete />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Main;