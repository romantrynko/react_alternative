import React from 'react';
import UserCard from '../user-card/UserCard';
import { usersList } from '../../constants'

export class UsersListPage extends React.Component {
	state = {
		users: usersList
	}

	render() {
		const { users } = this.state;
		return (
			<div className="d-flex">
				{
					users.map((user, index) => {
						return (
							<UserCard
								user={user}
								key={user.id}
							/>
						)
					})
				}
			</div>
		);

	}

}