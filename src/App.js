import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { Footer } from './components/footer/Footer';
import Header from './components/header/Header';

import HomePage from './components/home-page/HomePage';
import { UsersListPage } from './components/users-list/UsersList';
import PostPreview from './post-preview/PostPreview';
import { postsList } from './constants';


class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/home" exact>
            <HomePage />
          </Route>

          <Route path="/users" component={UsersListPage} exact />

          <Route path="/post-preview" render={(data) => {
            return (
              <PostPreview posts={postsList} />
            )
          }
          } exact />

        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;