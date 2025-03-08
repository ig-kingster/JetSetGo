import React, { useState } from 'react'
import './widget.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

const Widget = ({ type }) => {
    const [check,setCheck] = useState(true)
    console.log(check);
    let data;
    const amount = 100
    const diff = 20
    switch(type){
        case "user":
            data = {
                title:"USERS",
                isMoney:false,
                link:"See all users",
                icon:(
                        <PersonOutlinedIcon 
                        className='icon' 
                        style={{color:'crimson',
                                backgroundColor:"rgb(255,0,0,0.2)",
                                }}
                        />
                    ),
            };
            break;
        case "order":
                data = {
                    title:"ORDERS",
                    isMoney:false,
                    link:"View all orders",
                    icon:(
                        <ShoppingCartOutlinedIcon 
                        className='icon' 
                        style={{color:'crimson',
                                backgroundColor:"rgb(255,0,0,0.2)",
                                }}
                        />
                    ),
                };
                break;
        case "earning":
            data = {
                title:"EARNINGS",
                isMoney:true,
                link:"View net earnings",
                icon:(
                    <MonetizationOnOutlinedIcon 
                    className='icon' 
                    style={{color:'crimson',
                            backgroundColor:"rgb(255,0,0,0.2)",
                            }}
                    />
                ),
            };
            break;
        case "balance":
            data = {
                title:"BALANCE",
                isMoney:true,
                link:"See details",
                icon:(
                    <AccountBalanceWalletOutlinedIcon 
                    className='icon' 
                    style={{color:'crimson',
                            backgroundColor:"rgb(255,0,0,0.2)",
                            }}
                    />
                ),
            };
            break;
        default:
            break;
    }
  return (
        <div className={`${check ? 'widget light' : 'widget dark'}`}>
            <div className="left">
                <span className="title">{data.title}</span>       
                <span className="counter">
                    {data.isMoney && "$"} {amount}    
                </span>        
                <span className="link">{data.link}</span>        
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    20%
                </div>
                {data.icon}
            </div>
        </div>
  )
}

export default Widget