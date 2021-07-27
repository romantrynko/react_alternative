import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className='nav-item'>
          <a href={links[0].url} className='may-header-links-wrapper-link'>{links[0].name}</a>
        </div>
        <div className='nav-item'>
          <a href={links[1].url} className='may-header-links-wrapper-link'>{links[1].name}</a>
        </div>
        <div className='nav-item'>
          <a href={links[2].url} className='may-header-links-wrapper-link'>{links[2].name}</a>
        </div>
      </div>

      <UserInfo user={user}/>
    </div>
  )
}