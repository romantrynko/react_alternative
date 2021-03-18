import React, { Component } from 'react';
import PostCard from '../components/post-card/PostCard';
import { PostMenuList } from './PostMenuList';
import './PostPreview.scss';

const CN = 'may-post-preview';

export default class PostPreview extends Component {
    constructor(props) {
        super(props);

        const { posts } = props;
        this.state = {
            selectedPost: posts ? posts[0].id : null
        }

    };

    onPostSelect = (postId) => {
        this.setState({
            selectedPost: postId
        })
        
    }

    render() {
        const { selectedPost } = this.state;
        const { posts } = this.props;

        const post = posts.find(item => item.id === selectedPost)
        return (
            <div className={CN}>
                <div className={`${CN}-list`}>
                    <PostMenuList posts={posts} onSelect={this.onPostSelect}/>
                </div>
                <div className={`${CN}-content`}>
                    <PostCard post={post} className={`${CN}-card`}/>
                </div>
            </div>
        )
    };
};
