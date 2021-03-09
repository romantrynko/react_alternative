import React from 'react';
import './PostCard.scss';

export default function PostCard(props) {

    const { post } = props;
    const { title, body } = post;

    const kittyUrl = `https://cataas.com/cat/says/hello%20world!?${Math.random() * 1000}`;

    return (
        <div className="may-post-card card">
            <img src={kittyUrl} alt="kitty" />

            <div className="card-body">
                <h4 className="card-title">{title}</h4>
                <p className="card-text">
                    {body}
                </p>
                <a href="#!" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    )
}

