import React from 'react';

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
                <a href={link.url} className='may-header-links-wrapper-link'>{link.name}</a>
              </div>
            )
          })
        }
      </div>

      <UserInfo user={user} />
    </div>
  )
}