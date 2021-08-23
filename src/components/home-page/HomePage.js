import React, { Component } from 'react';
import { connect } from 'react-redux';

import { postsList, allComments, usersList } from '../../constants';
import { PostCard } from '../post-card/PostCard';
import uniqueId from 'uniqid';

import './App.css';
import './HomePage.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import PanelFromLecture from '../panel/PanelFromLecture';
import Dropdown from '../dropdown/Dropdown';
import PostPreview from '../post-preview/PostPreview';
import PostForm from '../post-form/PostForm';

import AddUserForm from '../user-form/AddUserForm';


import { addUser } from '../../actions';
import { UserCard } from '../user-card/UserCard';
// import { DECREMENT } from '../../action-types';

const sortingOption = ['Sort by default', 'Sort by author'];

class HomePage extends Component {

  state = {
    posts: [...postsList],
    selectedOption: sortingOption[0],
    users: this.props.users
  };



  onSort = (selectedOption) => {
    const [option1, option2] = sortingOption;

    switch (selectedOption) {
      case option1:
        this.onSortByDefault();
        this.setState({
          selectedOption: option1
        });
        break;
      case option2:
        this.onSortByAuthor();
        this.setState({
          selectedOption: option2
        });
        break;
      default: break;
    }
  }

  onSortByAuthor = () => {
    const res = [...this.state.posts];
    const { usersList } = this.props;

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

  addPost = (newPost) => {
    this.setState((prevState) => {
      return {
        posts: [{
          ...newPost,
          id: uniqueId(),
        }, ...prevState.posts]
      }
    })
  };

  // onUserAdd = (newUser) => {
  //   this.setState((prevState) => {
  //     return {
  //       users: [{
  //         ...newUser,
  //         id: uniqueId(),
  //       }, ...prevState.users]
  //     }
  //   })
  // };

  onUserAdd = (newUser) => {
    const { addUser } = this.props;
    addUser && addUser({
      ...newUser,
      id: uniqueId()
    });
  };

  render() {
    const { users } = this.props;
    const { posts, selectedOption } = this.state;

    return (
      <div className='App'>

        <PanelFromLecture label='Users' >
          <AddUserForm onUserAdd={this.onUserAdd} users={users} />
          {
            users.map(user => <UserCard user={user} key={user.id} />)
          }
        </PanelFromLecture>

        <PanelFromLecture label='Post Preview'>
          <PostPreview posts={posts} />
        </PanelFromLecture>

        <PanelFromLecture label='Posts'>

          <PostForm onAddPost={this.addPost} users={users} />

          <Dropdown
            onSelect={this.onSort}
            selectedOption={selectedOption}
            options={sortingOption}
          />

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

const mapDispatchToProps = ({
  addUser
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);