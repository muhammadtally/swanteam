import React from 'react';
import { bubble  as Menu } from 'react-burger-menu';
import './sidebar.css';
import Button from '@mui/material/Button';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link } from "react-router-dom";
import { useAuthenticator } from '@aws-amplify/ui-react';

export default props => {
    const { user, signOut } = useAuthenticator((context) => [context.user]);
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

            <Button className="logout-button" color="inherit" size="large" onClick={signOut} startIcon={<LogoutOutlinedIcon />}>
              התנתק
          </Button>
        

      </Menu>
    );
  };  