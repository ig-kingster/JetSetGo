import React, { useState } from 'react'
import './featured.scss'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { MyTheme } from '../../context/ThemeContext';

const Featured = () => {
        const [check,setCheck] = useState(true)
        console.log(check);
    
  return (
    <MyTheme.Provider value={{check,setCheck}}>
    <div className={`${check ? 'featured light' : 'featured dark'}`}>
        <div className="top">
            <h1 className="title">Total Revenue</h1>
            <MoreVertOutlinedIcon fontSize='small'/>
        </div>
        <div className="bottom">
            <div className="featuredChart">
                <CircularProgressbar value={70} text={"70%"} strokeWidth={5}/>
            </div>
            <p className="title"> Total sales made today</p>
            <p className="amounnt">$420</p>
            <p className="desc">
                Previous transactions processing.Last payments may not be included.
            </p>
            <div className="summary">
                <div className="item">
                    <div className="itemTitle">Target</div>
                    <div className="itemResult positive">
                        <KeyboardArrowDownOutlinedIcon/>
                        <div className="resultAmount">$12.4k</div>
                    </div>
                </div>
                <div className="item">
                    <div className="itemTitle">Last week</div>
                    <div className="itemResult positive">
                        <KeyboardArrowDownOutlinedIcon/>
                        <div className="resultAmount">$12.4k</div>
                    </div>
                </div>
                <div className="item">
                    <div className="itemTitle">Last month</div>
                    <div className="itemResult negative">
                        <KeyboardArrowUpOutlinedIcon/>
                        <div className="resultAmount">$12.4k</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </MyTheme.Provider>
  )
}

export default Featured