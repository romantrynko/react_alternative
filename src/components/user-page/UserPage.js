import { UserCard } from '../user-card/UserCard';
import { usersList } from '../../constants';
import { withRouter } from 'react-router';

const UserPageComponent = (props) => {
  const { match: { params: { userId } }, history } = props;

  const user = usersList.find(item => item.id === userId);

  const toUsersList = () => {
    history.push('/users')
  };

  const toHomePage = () => {
    history.push('/home')
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary m-2"
        onClick={toUsersList}
      >
        Back to users list
      </button>

      <button
        type="button"
        className="btn btn-primary m-2"
        onClick={toHomePage}
      >
        Home
      </button>

      {!!user && <UserCard user={user} />}
    </div>
  )
};

export const UserPage = withRouter(UserPageComponent);