import React from 'react';

import './Comment.scss';

export function Comment(props) {
  const { comment } = props;

  if (!comment) return null;

  const { name, email, body } = comment;

  return (
    <div className="may-comment-card">
        <p className="mb-0">{body}</p>
        <footer className="blockquote-footer"> Author:
          
            <span> {name}</span>
            <br />
            <span>{email}</span>
         
        </footer>
     
    </div>
  );
}