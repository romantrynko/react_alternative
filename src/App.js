import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';

import { Footer } from './components/footer/Footer';
import Header from './components/header/Header';

import HomePage from './components/home-page/HomePage';
import { UsersListPage } from './components/users-list/UsersList';
import PostPreview from './post-preview/PostPreview';
import { postsList, usersList } from './constants';
import { UserCard } from './components/user-card/UserCard';
import { appStore } from './store';
import PostsList from './components/posts-list/PostsList';
import PostDetailPage from './components/post-detail/PostDetailPage';
import ToDoPage from './components/todo-page/ToDoPage';

class App extends Component {
  render() {
    return (
      <Provider store={appStore}>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>

            <Route path="/todos" component={ToDoPage} exact/>

            <Route path="/home" exact>
              <HomePage />
            </Route>

            <Route path="/users" component={UsersListPage} exact />

            <Route path="/users/:userId" render={(routerProps) => {
              return (<UserPage {...routerProps} />)
            }} exact />

            <Route path="/posts" component={PostsList} exact />

            <Route path="/posts/:id" render={(routerProps) => {
              return (<UserPage {...routerProps} />)
            }} exact />

            <Route path="/post-preview" 
            render={(routerProps) => {
              return (
                <PostDetailPage {...routerProps} />
              )
            }} exact />

            <Redirect from="/" to="/home" />

            <Redirect from="*" to="/home" />

            <Route path="*">
              <NotFoundPage />
            </Route>

          </Switch>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;

const UserPage = (props) => {
  const { match: { params: { userId } }, history } = props;
  const user = usersList.find(item => item.id === userId);

  const toUsersList = () => {
    history.push('/users');
  }

  const toHomePage = () => {
    history.push('/home');

  }
  return (
    <div>
      <button type="button" onClick={toUsersList} className="btn btn-primary m-1">Users list</button>
      <button type="button" onClick={toHomePage} className="btn btn-primary m-1">Home page</button>
      {
        !!user && (
          <UserCard user={user} />
        )
      }
    </div>
  )
}

const NotFoundPage = () => {
  return <div>Page not found</div>
}