import React, { Component } from 'react';
import { PostCard } from '../post-card/PostCard';

import './PostPreview.scss';
import PostsMenuList from './PostsMenuList';

const CN = 'may-post-preview';

class PostPreview extends Component {
  constructor(props) {
    super(props);

    const { posts } = props;

    this.state = {
      selectedPost: posts ? posts[0].id : null
    }
  };

  componentDidMount() {
    console.log('componentDidMount');
    // document.addEventListener('click', this.showMessage())
  };

  componentWillUnmount() {
    console.log('componentWillUnmount');
    // document.removeEventListener('click', this.showMessage())
  };

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('Post preview did update', this.state.selectedPost, prevState.selectedPost);
  // }

  // showMessage = () => {
  //   alert('hello')
  // };

  onPostSelect = (postId) => {
    this.setState({
      selectedPost: postId
    })
  };


  render() {
    const { selectedPost } = this.state;
    const { posts } = this.props;

    const post = posts.find(item => item.id === selectedPost);

    return (
      <div className={CN}>
        <div className={`${CN}-list`}>
          <PostsMenuList posts={posts} onSelect={this.onPostSelect}/>
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

export default PostPreview;