import React, { Component } from 'react';

import HomePage from './components/home-page/HomePage';
import UsersList from './components/users-list/UsersList';
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
  Route
} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>

          <Route path='/home' exact>
            <HomePage />
          </Route>

          <Route path='/users' component={UsersList} exact />

          <Route path='/users/:id' render={(routerProps) => {
            return (
              <UserPage {...routerProps} />
            )
          }} />

          <Route path='/post-preview' render={(routerProps) => {
            return (
              <PostPreview posts={postsList} {...routerProps} />
            )
          }} />

        </Switch>

        <Footer />
      </Router>
    );
  }
};

export default App;

const UserPage = (props) => {
  const { match: { params: { id } } } = props;

  const user = usersList.find(item => item.id === id);

  return (
    <div>
      {!!user && <UserCard user={user} />}
    </div>
  )
};