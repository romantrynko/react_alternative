import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import './UserCard.scss'

function UserCardComponent(props) {
  const { user, match: { url } } = props;

  if (!user) return null;

  const { first_name, last_name, email, address, _links: { avatar } = {} } = user;
  return (
    <div className="may-user-card card">

      {avatar && <img src={avatar.href} alt="user avatar" className="may-user-card-avatar rounded-circle" />}

      <div className="card-body">
        <h4 className="card-title">{first_name} {last_name}</h4>
        <div className="card-text">
          <div>{email}</div>
          <div>{address}</div>
        </div>
      </div>

      <Link className='btn btn-secondary m-2' to={`${url}/${user.id}`}>Show details</Link>
    </div>
  );
};

export const UserCard = withRouter(UserCardComponent);