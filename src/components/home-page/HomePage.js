import React, { Component } from 'react';
import { connect } from 'react-redux';

import { usersList, postsList, allComments } from '../../constants';
import { PostCard } from '../post-card/PostCard';
import uniqueId from 'uniqid';

import './App.css';
import './HomePage.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import PanelFromLecture from '../panel/PanelFromLecture';
import Dropdown from '../dropdown/Dropdown';
import PostPreview from '../post-preview/PostPreview';
import PostForm from '../post-form/PostForm';
import { UsersList } from '../users-list/UsersList';
import AddUserForm from '../user-form/AddUserForm';


import { inc, dec } from '../../actions';
// import { DECREMENT } from '../../action-types';

const sortingOption = ['Sort by default', 'Sort by author'];

class HomePage extends Component {

  state = {
    posts: [...postsList],
    selectedOption: sortingOption[0],
    users: usersList
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

  addUser = (newUser) => {
    this.setState((prevState) => {
      return {
        users: [{
          ...newUser,
          id: uniqueId(),
        }, ...prevState.users]
      }
    })
  };

  onInc = () => {
    const { increment } = this.props;
    increment()
  };

  onDec = () => {
    const { decrement } = this.props;
    decrement()
  };

  render() {
    const { posts, selectedOption, users } = this.state;
    const { count } = this.props;

    return (
      <div className='App'>
        <h2 className='card card-header'>Count: {count}</h2>
        <button type="button" className="btn btn-secondary m-2" onClick={this.onInc}>Increment</button>
        <button type="button" className="btn btn-secondary m-2" onClick={this.onDec}>Decrement</button>

        <PanelFromLecture label='Users' >
          <AddUserForm onUserAdd={this.addUser} users={users} />
          <UsersList users={users} />
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

const mapStateToProps = (state) => {
  const { counter: { count, property, a } } = state;

  return {
    count,
    property,
    a
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(inc()),
    decrement: () => dispatch(dec())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);