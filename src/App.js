import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import './App.css';

import Navbar from './components/navbar/Navbar';
import ScrollButton from './components/goup/ScrollButton';

import Sidebar from './components/slidebar/Sidebar';
import Search from './components/pages/Search';
import Upload from './components/pages/Upload';
import Home from './components/pages/Home';

import AdminHome from './admincomponents/pages/AdminHome';
import AdminSearch from './admincomponents/pages/AdminSearch';
import AdminUpload from './admincomponents/pages/AdminUpload';
import AdminSide from './admincomponents/slidebar/AdminSide';
import Adduser from './admincomponents/pages/Adduser'
import AddGroup from './admincomponents/pages/AddGroup'

import "./components/login/styles.css";

import {Header} from './components/login/Header';
import {SignInHeader} from './components/login/SignInHeader';
import {SignInFooter} from './components/login/SignInFooter';
import {Footer} from './components/login/Footer';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);






export function App(){

  let  isAdmin = false;
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  if(user.signInUserSession.accessToken.payload["cognito:groups"].includes('Admins')) {isAdmin = false}

  return (
<>
          {!isAdmin ? (
            <Router>
            <Navbar />
            <Sidebar  />
            <div className="App">
              <Routes>
                <Route  exact path='/'  element={<Home />} />
                <Route path='/upload' element={<Upload />} />
                <Route path='/search' element={<Search />} />
              </Routes> 
              <ScrollButton />   
            </div>
          </Router>
            
          ) : (
            
            <Router>
            <Navbar />
            <AdminSide  />
            <div className="App">
            <Routes>
            <Route  exact path='/'  element={<AdminHome />} />
            <Route path='/upload' element={<AdminUpload />} />
            <Route path='/search' element={<AdminSearch />} />
            <Route path='/user' element={<Adduser />} />
            <Route path='/group' element={<AddGroup />} />
            </Routes> 
            <ScrollButton />   
            </div>
            </Router>
          )}
          </>
)
}

export default withAuthenticator(App, {
  components: {
    Header,
    SignIn: {
      Header: SignInHeader,
      Footer: SignInFooter
    },
    Footer
  }
});