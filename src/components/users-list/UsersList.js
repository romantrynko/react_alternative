import React from 'react'
import { UserCard } from './../user-card/UserCard';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { connect } from 'react-redux';

class UsersListPage extends React.Component {
  constructor(props) {
    super(props);

    const { location: { search }, users } = props;

    const { page } = queryString.parse(search);
 
    this.state = {
      users,
      page: page || 1
    };
  };

  render() {
    const { users } = this.state;

    return (
      <div className="d-flex flex-wrap">
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

const mapStateToProps = (store) => {
  const {
    usersReducer: { users }
  } = store;

  return {
    users
  }
};


export const UsersList = connect(mapStateToProps)(withRouter(UsersListPage));