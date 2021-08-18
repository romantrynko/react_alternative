import React, { Component } from 'react';

import HomePage from './components/home-page/HomePage';
import { UsersList } from './components/users-list/UsersList';
import { Header } from './components/header/HeaderFromLecture';
import { Footer } from './components/footer/Footer';
import PostPreview from './components/post-preview/PostPreview';
import { postsList } from './constants';
import { UserCard } from './components/user-card/UserCard';
import { usersList } from './constants/index';

// import { browserHistory } from 'react-router';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
        

          <Route path='/home' exact>
            <HomePage />
          </Route>

          <Route path='/users' component={UsersList} exact />

          <Route path='/users/:userId' render={(routerProps) => {
            return (
              <UserPage {...routerProps} />
            )
          }} />

          <Route path='/post-preview' render={(routerProps) => {
            return (
              <PostPreview posts={postsList} {...routerProps} />
            )
          }} />

          <Redirect from='/' to='/home' />
          <Redirect from='*' to='/home' />

          <Route path='*'>
            <NotFoundPage />
          </Route>

        </Switch>

        <Footer />
      </Router>
    );
  }
};

export default App;

const UserPage = (props) => {
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

const NotFoundPage = () => {
  return <div>Page not found</div>
};