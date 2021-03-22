import React, { Component } from 'react';

class PostForm extends Component {
    state = {
        title: '',
        body: '',
        user_id: this.props.users[1].id
    };

    onTitleChange = (event) => {
        const title = event.target.value;
        

        if (/\d+/.test(title)) {
            this.setState({
                warning: 'no numbers allowed'
            });
            return
        }
        this.setState({
            title,
            warning: ''
        })
    }

    onBodyChange = (event) => {
        const body = event.target.value;

        if (/\d+/.test(body)) {
            this.setState({
                warning: 'no numbers allowed'
            });
            return
        }
        this.setState({
            body,
            warning: ''
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
            <select value={selectedFullName} onChange={this.onUserSelect} className="form-select form-select-lg mb-3" >
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
        const { title, body, warning } = this.state;
        return (
            <form className="may-add-post-form" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label for="formGroupExampleInput">Text</label>
                    {
                        !!warning && <div className="text-monospace">{warning}</div>
                    }
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
                    <label for="formGroupExampleInput">Text</label>
                    {
                        !!warning && <div className="text-monospace">{warning}</div>
                    }
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

                <button type="submit" className="btn btn-primary m-1">Add post</button>
            </form>
        );
    }
}

export default PostForm;