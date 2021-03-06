import React from 'react';
import './PostCard.scss';

export default function PostCard(props) {

    const { post } = props;
    const { title, body } = post;

    return (
        <div className="may-post-card card">
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

