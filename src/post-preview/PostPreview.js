import React, { Component } from 'react';
import PostCard from '../components/post-card/PostCard';
import PostMenuList from './PostMenuList';
import './PostPreview.scss';

const CN = 'may-post-preview';

export default class PostPreview extends Component {
    constructor(props) {
        super(props);

        const { posts } = props;
        this.state = {
            selectedPost: posts ? posts[0] : null
        }

    };


    render() {
        const { selectedPost } = this.state;
        const { posts } = this.props;

        return (
            <div className={CN}>
                <div className={`${CN}-list`}>
                    <PostMenuList posts={posts} />
                </div>
                <div className={`${CN}-content`}>
                    <PostCard post={selectedPost} />
                </div>
            </div>
        )
    };
};
