import React from 'react';
import './PostCard.scss';
import DefaultImg from '../../assets/empty.png';

export function PostCard(props) {
  const { post, hasImage } = props;
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
      </div>
    </div>
  )
}
