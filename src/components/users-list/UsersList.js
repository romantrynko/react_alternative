import React from 'react';
import UserCard from '../user-card/UserCard';

export function UsersList(props) {
	const { users } = props;
	return (
		<div className="d-flex">
			{
				users.map((user, index) => {
					const fullName = `${user.first_name} ${user.last_name}`
					return (
						<UserCard
							user={fullName}
							key={user.id}
						/>
					)
				})
			}
		</div>
	);
}