import React from 'react';
import { bubble  as Menu } from 'react-burger-menu';
import './sidebar.css';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";

export default props => {
    return (
        <Menu className="menu" right>
            <img
                  src="https://i.ibb.co/bNDrTFH/Navlogo.png"
                className="logo-img"
                  alt="website logo"
            />
  
            <Link
                className="menu-item"
                to="/"
  
            >
                דף הבית
            </Link>
  
            <Link
                className="menu-item"
                to="/upload"
               
            >
                העלאה
            </Link>
            
            <Link
                className="menu-item"
                to="/search"
              
            >
                חיפוש
            </Link>
       
        

      </Menu>
    );
  };  