import React, { Component } from 'react';
import { Header } from '../header/HeaderFromLecture'
import { usersList, postsList, allComments } from '../../constants';
import { Footer } from './../footer/Footer';
import { UserCard } from '../user-card/UserCard';
import { PostCard } from '../post-card/PostCard';

import './App.css';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import PanelFromLecture from '../panel/PanelFromLecture';

class App extends Component {

  state = {
    posts: [...postsList]
  };

  onSortByAuthor = () => {
    const res = [...this.state.posts];

    const result = res.sort(function (a, b) {
      const authorA = usersList.find(user => user.id === a.user_id);
      const authorB = usersList.find(user => user.id === b.user_id);

      if (authorA.first_name > authorB.first_name) {
        return 1;
      }
      if (authorA.first_name < authorB.first_name) {
        return -1;
      }

      return 0;
    });

    this.setState({
      posts: result
    })
  };

  onSortByDefault = () => {
    this.setState({
      posts: [...postsList]
    })
  };

  render() {
    const { posts } = this.state

    return (
      <div className='App'>
        <Header />

        <PanelFromLecture label='Users'>
          <div className='d-flex posts-container'>
            {
              usersList.map(item => {
                return (
                  <UserCard user={item} key={item.id} />
                )
              })
            }
          </div>
        </PanelFromLecture>

        <PanelFromLecture label='Posts'>
          <div className='d-flex'>
            <b>Sorting:</b>
            <button
              className='btn btn-primary m-1'
              onClick={this.onSortByAuthor}
            >By author</button>
            <button
              className='btn btn-primary m-1'
              onClick={this.onSortByDefault}
            >By default</button>
          </div>

          <div className='d-flex posts-container'>
            {
              posts.map((item, index) => {
                const user = usersList.find(user => user.id === item.user_id);
                const author = user ? `${user.first_name} ${user.last_name}` : '';
                const comments = allComments.filter(comment => comment.post_id === item.id);

                return <PostCard
                  post={item}
                  key={item.id}
                  hasImage={index % 2 !== 0}
                  author={author}
                  comments={comments}
                />
              })
            }
          </div>
        </PanelFromLecture>

        <Footer />
      </div>
    )
  }
}

export default App;