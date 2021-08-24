import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PostCard } from '../post-card/PostCard';
import { getPosts } from '../../actions/postsAction';

import './PostsList.scss';

class PostsList extends Component {
  componentDidMount() {
    const { posts, getPosts } = this.props;
    if (!posts.length) {
      getPosts && getPosts()
    }
  };

  render() {
    const { posts, isLoading, usersList } = this.props;

    return (
      <div className='posts-list'>
        {
          isLoading && <div>Posts are loading</div>
        }
        {
          !isLoading && posts.map(item => {
            const user = usersList.find(user => user.id === item.user_id);
            const author = user ? `${user.first_name} ${user.last_name}` : '';

            return <PostCard
              post={item}
              key={item.id}
              author={author}
            />
          })
        }
      </div>
    );
  }
};

const mapStateToProps = (store) => {
  const {
    postsReducer: { posts, isPostsLoading },
    usersReducer: { users }
  } = store;

  return {
    posts,
    usersList: users,
    isLoading: isPostsLoading
  }
};

const mapDispatchToProps = ({
  getPosts
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList);