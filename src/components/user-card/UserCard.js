import React from 'react';
import './UserCard.scss';

export default function UserCard(props) {

    const { post } = props;
    const { title, body } = post;

    const kittyUrl = `https://cataas.com/cat/says/hello%20world!?${Math.random() * 1000}`;

    return (
        <div className="may-user-card card">
            <img src={kittyUrl} alt="kitty" />


            <div className="card-body">
                <h4 className="card-title">{title}</h4>
                <p className="card-text">
                    {body}
                </p>
                <a href="kittyUrl" className="btn btn-primary">Change photos</a>
            </div>
        </div>
    )
}

