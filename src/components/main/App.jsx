import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { HashRouter } from 'react-router-dom';
import Routes from './Routes'


import Footer from '../templates/Footer';
import Logo from '../templates/Logo';
import Nav from '../templates/Nav';

export default props =>
    <div className="app">
        <HashRouter>
            <Logo />
            <Nav />
            <Routes />
            <Footer />
        </HashRouter>
    </div>