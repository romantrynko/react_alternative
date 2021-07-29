import React, { PureComponent } from 'react';
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

      id && this.loadComments(id);
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.post.id !== this.props.post.id) {
      this.loadComments(this.props.post.id)
    }
  };

  loadComments = async (postId) => {
    this.setState({
      isCommentsLoading: true,
      showComments: true
    })

    let response = await fetch(`https://gorest.co.in/public-api/comments?access-token=${accessToken}&post_id=${postId}`);

    if (response.ok) {
      let json = await response.json();

      const result = json.data;

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
  };

  onToggleComments = () => {
    this.setState({
      showComments: !this.state.showComments
    })
  };


  // shouldComponentUpdate(nextProps, nextState) {
  //   const { post: currentPost } = this.props;
  //   const { post: nextPost } = nextProps;

  //   return currentPost.id !== nextPost.id;
  // };

  render() {
    const { post, hasImage, author = '', className = '' } = this.props;
    const { title, body } = post;
    const { comments, showComments, error, isCommentsLoading, commentsLoaded } = this.state;

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
          </footer>
          {
            <label
              className='btn btn-link'
              onClick={this.onToggleComments}
            >{showComments ? 'Hide comments' : 'Show Comments'}</label>
          }
          <div>

            {
              !!error && <div>{error}</div>
            }
            {
              showComments && <label>Comment:</label>
            }
            {
              showComments && isCommentsLoading && <div>Loading comments ...</div>
            }
            {
              showComments && !isCommentsLoading && commentsLoaded && !comments.length && <div>No comments for this post yet</div>
            }
            {
              showComments && !isCommentsLoading && commentsLoaded && !!comments.length && comments.map(comment => {
                return (
                  <Comment comment={comment} key={comment.id} />
                )
              })
            }
          </div>
        </div>
      </div>
    )

  }
}

