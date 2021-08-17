import React from 'react';
import { NavLink } from 'react-router-dom';

import { links, user } from '../../constants';
import { UserInfo } from '../user-info/UserInfoFromLecture';

import './Header.scss';
import '../header/Header.scss';
import Logo from '../../assets/logo.png';

export const Header = (props) => {

  return (
    <div className='may-header navbar'>
      <img src={Logo} alt='logo' className='may-header-logo' />
      <div className='may-header-links-wrapper'>

        {
          links.map((link, index) => {
            return (
              <div className='nav-item' key={index}>
                <NavLink
                  to={link.url}
                  className='may-header-links-wrapper-link'
                  activeClassName='active'
                >
                  {link.name}
                </NavLink>
              </div>
            )
          })
        }
      </div>

      <UserInfo user={user} />
    </div>
  )
}