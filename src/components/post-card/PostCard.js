import React, { Component, PureComponent } from 'react';
import './PostCard.scss';
import DefaultImg from '../../assets/empty.png';
import { Comment } from '../comment/Comment';
import { accessToken } from '../../constants';

export class PostCard extends PureComponent {

  state = {
    comments: [],
    isCommentsLoading: false,
    commentsLoaded: false,
    showComments: false,
    error: ''
  };

  componentDidMount() {
    const { post } = this.props;

    if (post) {
      const { id } = post;
      id && this.loadComments();
    }

  }

  componentDidUpdate(prevProps, prevState) {
    console.log('PostCard did update', prevProps.post, this.props.post);
    if (prevProps.post.id !== this.props.post.id) {
      this.loadComments(this.props.post.id)
    }
  };

  loadComments = async (postId) => {
    let response = await fetch(`https://gorest.co.in/public-api/comments?access-token=${accessToken}&post_id=${postId}`);
    console.log(response);

    if (response.ok) {
      let json = await response.json();

      const { result } = json;

      if (Array.isArray(result)) {
        this.setState({
          isCommentsLoading: false,
          commentsLoaded: true,
          error: '',
          comments: result
        });

      } else {

        this.setState({
          isCommentsLoading: false,
          commentsLoaded: false,
          error: response.status,
          commentsSectionExpanded: false,
        })
      }
    }
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   const { post: currentPost } = this.props;
  //   const { post: nextPost } = nextProps;

  //   return currentPost.id !== nextPost.id;
  // };

  render() {
    const { post, hasImage, author = '', className = '' } = this.props;
    const { title, body } = post;
    const { comments } = this.state;

    const kittyUrl = `https://cataas.com/cat/says/hello%20world!?${Math.random() * 1000}`;

    const renderImage = () => {
      return (
        hasImage ? (
          <div className='may-post-card-img'>
            <img src={kittyUrl} alt='cats' />
          </div>
        ) : (
          <div className='may-post-card-img'>
            <img src={DefaultImg} alt='nopicture' />
          </div>
        )
      )
    };

    return (
      <div className={`may-post-card card ${className}`} >
        {
          renderImage()
        }

        <div div className="card-body" >
          <h4 className="card-title title">{title}</h4>
          <div className="card-text body">
            {body}
          </div>
          <footer className='blockquote-footer'>
            Author: {author}
            <div>
              {
                !!comments.length && <label>Comment:</label>
              }
              {
                !!comments && comments.map(comment => {
                  return (
                    <Comment comment={comment} key={comment.id} />
                  )
                })
              }
            </div>
          </footer>
        </div>
      </div>
    )

  }
}

