import React, { Component } from 'react';
import { accessToken, usersList } from '../../constants';
import PostCard from '../post-card/PostCard';

class PostsList extends Component {
  state = {
    posts: [],
    isLoading: false
  };

  componentDidMount() {

    this.loadPosts()
  }

  loadPosts = async () => {

    this.setState({
      isLoading: true,
    });

    let response = await fetch(`https://gorest.co.in/public-api/posts?access-token=${accessToken}`);

    if (response.ok) {
      let json = await response.json();

      const { result } = json;

      if (Array.isArray(result)) {
        this.setState({
          isLoading: false,
          commentsLoaded: true,
          error: '',
          posts: result || []
        });
      }
    } else {
      this.setState({
        isLoading: false,
        error: response.status
      });
    }
  };


  render() {
    const { posts, isLoading } = this.state;

    return (
      <div className="render-posts">
        <div>Posts page</div>

        {
          isLoading && <div>Loading</div>
        }
        {
          posts.map((item) => {
            const user = usersList.find(user => user.id === item.user_id);
            const author = user ? `${user.first_name} ${user.last_name}` : '';

            return <PostCard
              post={item}
              key={item.id}
              author={author}
            />;
          })
        }
      </div>
    );
  }
}

export default PostsList;