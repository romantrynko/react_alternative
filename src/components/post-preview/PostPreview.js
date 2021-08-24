import React, { Component } from 'react';
import { PostCard } from '../post-card/PostCard';

import './PostPreview.scss';
import PostsMenuList from './PostsMenuList';
import { connect } from 'react-redux';
import { getPosts } from './../../actions/postsAction';

const CN = 'may-post-preview';

class PostPreviewComponent extends Component {
  constructor(props) {
    super(props);

    const { posts } = props;

    this.state = {
      selectedPostId: posts.length ? posts[0].id : null
    }
  };

  componentDidMount() {
    const { posts, getPosts } = this.props;

    if (!posts.length) {
      getPosts && getPosts()
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.posts.length !== this.props.posts.length) {
      this.setState({
        selectedPostId: this.props.posts[0].id
      });
    }
  };
  // componentWillUnmount() {
  //   console.log('componentWillUnmount');
  //   document.removeEventListener('click', this.showMessage())
  // };

  // 

  // showMessage = () => {
  //   alert('hello')
  // };

  onPostSelect = (postId) => {
    this.setState({
      selectedPostId: postId
    })
  };


  render() {
    const { selectedPostId } = this.state;
    const { posts } = this.props;

    const post = posts.find(item => item.id === selectedPostId);

    if (!post) return (<div>No posts yet</div>)

    return (
      <div className={CN}>
        <div className={`${CN}-list`}>
          <PostsMenuList posts={posts} onSelect={this.onPostSelect} />
        </div>
        <div className={`${CN}-content`}>
          <PostCard
            post={post}
            className={`${CN}-card`} />
        </div>
      </div>
    );
  };
}

const mapStateToProps = (store) => {
  const { postsReducer: { posts } } = store;

  return {
    posts
  }
};

const mapDispatchToProps = ({
  getPosts
});

export const PostPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPreviewComponent);