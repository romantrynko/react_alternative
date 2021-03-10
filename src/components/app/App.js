import React, { Component } from 'react';
import Header from '../header/Header';
import Panel from '../panel/Panel';
import PostPreview from '../../post-preview/PostPreview';
import { DropDown } from '../drop-down/DropDown';
import { Footer } from '../footer/Footer';
import { allComments, postsList, usersList } from '../../constants';
import Card from '../user-card/UserCard';

import './App.scss';

export default class App extends Component {

  state = {
    posts: [...postsList]
  }

  onSortByDefault = () => {
    this.setState({
      posts: [...postsList]
    })
  }

  onSortByAuthorClick = () => {
    const res = [...this.state.posts];

    const sorted = res.sort(function (a, b) {

      const authorA = usersList.find(user => user.id === a.user_id);
      const authorB = usersList.find(user => user.id === b.user_id);

      if (authorA.first_name < authorB.first_name) {
        return -1;
      }
      if (authorA.first_name > authorB.first_name) {
        return 1;
      }

      return 0;
    });

    this.setState({
      posts: sorted
    })
  }

  render() {
    // todo 4) достать также в строке 92 из стейта selectedOption
    const { posts } = this.state;

    return (
      <div className="App">
        <Header />

        <Panel>
          Hello, world!
        </Panel>

        <Panel label="test" isOpenByDefault>
          <PostPreview posts={posts} />
        </Panel>

        <Panel label="Posts" >
          <div className="d-flex">
            Sorting:
            <button onClick={this.onSortByAuthorClick}>By author</button>
            <button onClick={this.onSortByDefault}>By default</button>

            <DropDown />
          </div>
          <div className="d-flex posts-container">
            {
              posts.map((item, index) => {
                const user = usersList.find(user => user.id === item.user_id);
                const author = user ? `${user.first_name} ${user.last_name}` : '';
                const comments = allComments.filter(comment => comment.post_id === item.id);

                return <Card
                  post={item}
                  key={item.id}
                  hasImage={index % 2 !== 0}
                  author={author}
                  comments={comments}
                />;
              })
            }
          </div>
        </Panel>
        <Footer />
      </div>
    );
  }
}
