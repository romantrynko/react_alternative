import React, { Component } from 'react';

const CN = 'may-post-menu';

export default class PostMenuList extends Component {
    render() {
        const { posts = [] } = this.props

        return (
            <ul className={CN}>
                {
                    posts.map((post) => (<li key={post.id} className={`${CN}-option`}>{post.title}</li>))
                }
            </ul>
        )
    }
}
