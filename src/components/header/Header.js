import React, { Component } from 'react';
import { links } from '../../constants';
import Logo from '../../assets/react.png';



import './Header.scss';

export default class Header extends Component {
    render() {
        return (
            <div className="may-header navbar">
                <img src={Logo} alt="Logo" className="may-header-logo" />
    
                <div className="may-header-links-wrapper">
                    <div className="nav-item">
                        <a href={links[0].url} className="may-header-links-wrapper-link nav-link">{links[0].name}</a>
                    </div>
                    <div className="nav-item">
                        <a href={links[1].url} className="may-header-links-wrapper-link nav-link">{links[1].name}</a>
                    </div>
                    <div className="nav-item">
                        <a href={links[2].url} className="may-header-links-wrapper-link nav-link">{links[2].name}</a>
                    </div>
                </div>
    
                
            </div>
        );
    }
};