import './Logo.css';
import React from 'react';
import logo from '../../assets/imgs/logo.png';
import { Link } from 'react-router-dom';
//O import Link substitui a tab a href por link, conforme é possível acompanhar abaixo


export default props =>
    <aside className="logo">
        <Link to='/' className='logo'>
            <img src={logo} alt='logo' />
        </Link>
    </aside>