import React, { Component } from 'react';
import { allComments, postsList, usersList } from '../../constants';
import { DropDown } from '../drop-down/DropDown';
import AddUserForm from '../user-form/AddUserForm';
import { UserCard } from '../user-card/UserCard';
import PostForm from '../post-form/PostForm';
import PostPreview from '../../post-preview/PostPreview';
import Panel from '../panel/Panel';

import './HomePage.scss';



const sortingOptions = ['Sort By Default', 'Sort By Author'];

export default class HomePage extends Component {

  state = {
    posts: [...postsList],
    selectedOption: sortingOptions[0],
    users: usersList
  }

  onSort = (selectedOption) => {
    const [option1, option2] = sortingOptions;

    switch (selectedOption) {
      case option1:
        this.onSortByDefault();
        this.setState({
          selectedOption: option1
        });
        break;
      case option2:
        this.onSortByAuthorClick();
        this.setState({
          selectedOption: option2
        });
        break;
      default:
        break;
    }
  };

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

  addPost = (newPost) => {
    this.setState((prevState) => {
      return {
        posts: [{
          ...newPost,
          id: Math.random() * 10000
        }, ...prevState.posts]
      }
    })
  }

  render() {
    const { posts, selectedOption, users } = this.state;

    return (
      <div className="App">
        <Panel label="Users">
          <AddUserForm />
        </Panel>

        <Panel label="Post Preview" >
          <PostPreview posts={posts} />
        </Panel>

        <Panel label="Posts">
          <div className="d-flex">
            Sorting:
            <button onClick={this.onSortByAuthorClick} className="btn btn-primary m-1">By author</button>
            <button onClick={this.onSortByDefault} className="btn btn-primary m-1">By default</button>

            <DropDown
              onSelect={this.onSort}
              selectedOption={selectedOption}
              options={sortingOptions}
            />
          </div>
          <div className="d-flex posts-container">
            <PostForm
              users={users}
              onAddPost={this.addPost} />
            {
              posts.map((item, index) => {
                const user = usersList.find(user => user.id === item.user_id);
                const author = user ? `${user.first_name} ${user.last_name}` : '';
                const comments = allComments.filter(comment => comment.post_id === item.id);

                return (
                  <UserCard
                    post={item}
                    key={item.id}
                    hasImage={index % 2 !== 0}
                    author={author}
                    comments={comments}
                  />
                )
              })
            }
          </div>
        </Panel>
      </div>
    );
  }
}
