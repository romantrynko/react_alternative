import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { links } from '../../constants';
import Logo from '../../assets/react.png';



import './Header.scss';

export default class Header extends Component {
  render() {
    return (
      <div className="may-header navbar">
        <img
          src={Logo}
          className="may-header-logo"
          alt="Logo"
        />

        <div className="may-header-link-wrapper">
          {
            links.map(item => {
              return (
                <div
                  className="nav-item"
                  key={item.url}
                >
                  <NavLink
                    to={item.url}
                    activeClassName="active"
                    className="may-header-link-wrapper-link nav-link"
                  >
                    {item.name}
                  </NavLink>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
};