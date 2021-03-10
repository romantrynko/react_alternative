import React from 'react';
import './PostCard.scss';

import defaultImg from '../../assets/empty-avatar.png';

export default function PostCard(props) {

    const { post, hasImage, comments = [], author = '' } = props;
    const { title, body } = post;

    const kittyUrl = `https://cataas.com/cat/says/hello%20world!?${Math.random() * 1000}`;

    const renderImage = () => {
        return hasImage ? (
            <img src={kittyUrl} alt="kitten" />
        ) : (
            <img src={defaultImg} alt="emptyPhoto" />
        )
    }

    return (
        <div className="may-post-card card">
            {hasImage && (
                <div className="may-post-card-img" id="my-block" onClick={() => {
                    alert('alert');
                }}>
                    <img src={kittyUrl} alt="kitty" />
                </div>
            )}
            {!hasImage && (
                <div className="may-post-card-img">
                    <img src={defaultImg} alt="emptyPhoto" />
                </div>
            )}

            <div className="card-body">
                <h4 className="card-title title">{title}</h4>
                <div className="card-text body">
                    {body}
                </div>
                <blockquote className="blockquote">
                    <footer className="blockquote-footer">Author:
                        <cite title="Source title"></cite>
                    </footer>
                </blockquote>
            </div>
            {!!comments.length && <label>Comments:</label>}
        </div>
    )
}

