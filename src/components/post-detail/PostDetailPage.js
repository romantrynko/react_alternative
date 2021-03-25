import React, { Component } from 'react';
import { withRouter } from "react-router";
import { accessToken } from "../../constants";
import PostCard from "../post-card/PostCard";

class PostDetailsPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      post: null,
      isLoading: false
    };
  }

  componentDidMount() {

    this.loadPost()
  }

  loadPost = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({
      isLoading: true
    });

    let response = await fetch(`https://gorest.co.in/public-api/posts/${id}?access-token=${accessToken}`);

    if (response.ok) {
      let json = await response.json();

      const { result } = json;

      if (typeof (result) === "object") {
        this.setState({
          isLoading: false,
          commentsLoaded: true,
          error: '',
          posts: result || undefined
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
      <div>
        <div>Post Details Page</div>
        {
          isLoading && (<div>...Loading</div>)
        }
        {
          !isLoading && posts && <PostCard post={posts} withCommentsLoading />
        }
      </div>
    );
  }
}

export default PostDetailsPage;