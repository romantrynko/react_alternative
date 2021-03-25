import React, { PureComponent } from 'react';
import { accessToken } from '../../constants';
import './PostCard.scss';

import defaultImg from '../../assets/empty-avatar.png';
import { Comment } from '../Comments/Comments';

export class PostCard extends PureComponent {

    state = {
        comments: []
    };

    componentDidMount() {
        const { post } = this.props;

        if (post) {
            const { id } = post;
            id && this.loadComments(id)
        }
    }

    componentDidUpdate(prevProps) {
        console.log("PostCard componentDidUpdate", prevProps.post.id, this.props.post.id);
        if (prevProps.post.id !== this.props.post.id) {
            this.loadComments(this.props.post.id);
        }

    };

    loadComments = async (postId) => {
        let response = await fetch(`https://gorest.co.in/public-api/comments?access-token=${accessToken}&post_id=${postId}`);

        if (response.ok) {
            let result = await response.json();

            const {comments} = result;
            
            if (Array.isArray(comments)) {
                this.setState({
                    comments
                });
            }
        } else {
            alert('Error HTTP: ' + response.status);
        }
    };

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     const { post: curPost } = this.props;
    //     const { post: nextPost } = nextProps;

    //     return curPost.id !== nextPost;

    //     // if (curPost.id === nextPost.id) {
    //     //     return false;
    //     // } else {
    //     //     return true;
    //     // }
    // }

    render() {

        const { post, hasImage, author = '', className } = this.props;
        const { title, body } = post;
        const { comments } = this.state;

        const kittyUrl = `https://cataas.com/cat/says/hello%20world!?${Math.random() * 1000}`;


        return (
            <div className={`may-post-card card ${className}`} >
                {
                    hasImage && (
                        <div className="may-post-card-img" id="my-block" onClick={() => {
                            alert('alert');
                        }}>
                            <img src={kittyUrl} alt="kitty" />
                        </div>
                    )
                }
                {
                    !hasImage && (
                        <div className="may-post-card-img">
                            <img src={defaultImg} alt="emptyPhoto" />
                        </div>
                    )
                }

                <div className="card-body">
                    <h4 className="card-title title">{title}</h4>
                    <div className="card-text body">
                        {body}
                    </div>
                    <blockquote className="blockquote">
                        <footer className="blockquote-footer">Author: {author}
                            <cite title="Source title"></cite>
                        </footer>
                    </blockquote>
                </div>
                { !!comments.length && <label>Comments:</label>}
                {
                    comments.map(comment => (<Comment comment={comment} key={comment.id} />))
                }
            </div>
        )
    }
}

export default PostCard
