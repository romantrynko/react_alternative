import React, { Component } from 'react';

import HomePage from './components/home-page/HomePage';
import { UsersList } from './components/users-list/UsersList';
import { Header } from './components/header/HeaderFromLecture';
import { Footer } from './components/footer/Footer';
import PostPreview from './components/post-preview/PostPreview';
import { postsList } from './constants';

import { PostCard } from './components/post-card/PostCard';
import { UserPage } from './components/user-page/UserPage';
import NotFoundPage from './components/not-found-page/NotFoundPage';
import PostsList from './components/posts-list/PostsList';
import { PostDetailPage } from './components/post-detail-page/PostDetailPage';

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

          <Route path='/posts' component={PostsList} exact />

          <Route path='/posts/:id' render={(routerProps) => {
            return (
              <PostDetailPage {...routerProps} />
            )
          }} />

          <Route path='/post-preview' render={(routerProps) => {
            return (
              <PostPreview posts={postsList} {...routerProps} />
            )
          }} />


          <Redirect from='/' to='/home' />

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



