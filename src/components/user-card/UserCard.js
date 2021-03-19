import React from 'react';
import './UserCard.scss';

export default function UserCard(props) {

	const { user } = props;

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
		</div>
	)
}
