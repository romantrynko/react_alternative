import React, { Component } from 'react';
import './PostPreview.scss';

const CN = 'may-posts-menu';

export class PostMenuList extends Component {

    onSelect = (id) => {
        const { onSelect } = this.props;
        return () => {
            onSelect && onSelect(id);
        }
    }

    render() {
        const { posts = [] } = this.props

        return (
            <ul className={CN}>
                {
                    posts.map((item) => (<li key={item.id} className={`${CN}-option`} onClick={this.onSelect(item.id)}>{item.title}</li>))
                }
            </ul>
        )
    }
}
