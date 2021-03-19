import React, { Component } from 'react';

class PostForm extends Component {
    state = {
        title: '',
        body: '',
        user_id: this.props.users[1].id
    };

    onTitleChange = (event) => {
        const title = event.target.value
        this.setState({
            title
        })
    }

    onBodyChange = (event) => {
        const body = event.target.value
        this.setState({
            body
        })
    }

    onUserSelect = (event) => {
        const selectedIndex = event.target.selectedIndex

        this.setState((prevState, props) => {
            return {
                user_id: props.users[selectedIndex].id
            };
        });

        // const { users } = this.props;
        // this.setState({
        //     user_id: users[selectedIndex].id
        // });
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        const { onAddPost } = this.props;
        const { title, body, user_id } = this.state
        const newPost = {
            title,
            body,
            user_id
        };

        onAddPost && onAddPost(newPost);
    }

    renderUsersSelect = () => {
        const { users } = this.props;
        const { user_id } = this.state;

        const selectedUser = users.find(item => item.id === user_id);
        const selectedFullName = `${selectedUser.first_name} ${selectedUser.last_name}`
        return (
            <select value={selectedFullName} onChange={this.onUserSelect} >
                {
                    users.map(user => {
                        const fullName = `${user.first_name} ${user.last_name}`
                        return (
                            <option key={user.id} value={fullName}>{fullName}</option>
                        );
                    })
                }
            </select>
        )
    }

    render() {
        const { title, body, user_id } = this.state;
        return (
            <form className="may-add-post-form" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label for="formGroupExampleInput">Example label</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder="Example input"
                        value={title}
                        onChange={this.onTitleChange}
                    />
                </div>
                <div className="form-group">
                    <label for="formGroupExampleInput">Example label</label>
                    <textarea
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder="Example input"
                        value={body}
                        onChange={this.onBodyChange}
                    />
                </div>

                {
                    this.renderUsersSelect()
                }

                <button type="submit" className="btn btn-primary">Add post</button>
            </form>
        );
    }
}

export default PostForm;