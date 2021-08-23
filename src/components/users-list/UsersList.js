import React from 'react'
import { UserCard } from './../user-card/UserCard';
import { usersList } from '../../constants';
import { withRouter } from 'react-router';
import queryString from 'query-string';

class UsersListPage extends React.Component {
  constructor(props) {
    super(props);

    const { location: { search } } = props;

    const { page } = queryString.parse(search);
 
    this.state = {
      users: usersList,
      page: page || 1
    };
  };

  render() {
    const { users } = this.state;

    return (
      <div className="d-flex">
        {
          users.map((user, index) => {
            return <UserCard
              user={user}
              key={user.id}
            />
          })
        }
      </div>
    )
  }
};

export const UsersList = withRouter(UsersListPage);