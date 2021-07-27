import React from 'react';
import './PostCard.scss';
import DefaultImg from '../../assets/empty.png';
import { Comment } from '../comment/Comment';

export function PostCard(props) {
  const { post, hasImage, author, comments } = props;
  const { title, body } = post;

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
    <div className='may-post-card card'>
      {
        renderImage()
      }

      <div className="card-body">
        <h4 className="card-title title">{title}</h4>
        <div className="card-text body">
          {body}
        </div>
        <footer className='blockquote-footer'>
          {author}
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
