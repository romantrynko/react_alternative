import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './UserCard.scss';

function UserCardComponent(props) {
	const { user, location, match: { path } } = props;


	if (!user) return null;

	const { first_name, last_name, email, address } = user;

	return (
		<div className="may-user-card card">
			<div className="card-body">
				<h4 className="card-title">{first_name} {last_name}</h4> 
				<div className="card-text">
					<div>{email}</div>
					<div>{address}</div>
				</div>
			</div>

			<Link to={`${path}/${user.id}`} className="nav-link">Details</Link>
		</div>
	)
}

export const UserCard = withRouter(UserCardComponent);