import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { PostCard } from '../post-card/PostCard';
import { accessToken } from '../../constants';
import { Link } from 'react-router-dom';

class PostDetailPageComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      post: null,
      isLoading: false
    }
  };

  componentDidMount() {
    this.loadPost();
  };

  loadPost = async () => {
    const { match: { params: { id } } } = this.props;


    this.setState({
      isLoading: true
    });

    let response = await fetch(`https://gorest.co.in/public-api/posts/${id}?access-token=${accessToken}`);

    if (response.ok) {
      let json = await response.json();

      const result = json.data;

      if (typeof (result) === 'object') {
        this.setState({
          isLoading: false,
          erros: '',
          post: result || {}
        });

      } else {

        this.setState({
          isLoading: false,
          error: response.status
        })
      }
    }
  };

  render() {
    const { post, isLoading } = this.state;

    return (
      <div>
        {
          <div>
            <Link to='/home' className='btn btn-primary m-2' >Home</Link>
            <Link to='/posts' className='btn btn-primary m-2' >Back to Postlist</Link>
          </div>
        }
        {
          isLoading && <div>Loading</div>
        }
        {
          !isLoading && post && <PostCard post={post} />
        }
      </div>
    );

  }

}

export const PostDetailPage = withRouter(PostDetailPageComponent);