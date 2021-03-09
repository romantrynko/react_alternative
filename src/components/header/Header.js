import React from 'react';
import './header.scss';
import Logo from '../../assets/react.png';

export default function Header() {
    return (
        <div className="may-header">
            <img src={Logo} alt="Logo" className="may-header-logo" />
            
        </div>
    );
};