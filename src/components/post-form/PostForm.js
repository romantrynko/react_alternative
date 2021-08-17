import React, { Component } from 'react';

import './AddPostForm.scss';

class PostForm extends Component {
  state = {
    title: '',
    body: '',
    user_id: this.props.users[0].id
  };

  onTitleChange = (event) => {
    const title = event.target.value

    this.setState({
      title
    })
  };

  onBodyChange = (event) => {
    const body = event.target.value;

    if (/^\d+$/.test(body)) {
      this.setState({
        warning: 'Please don\'t type numbers'
      });

      return;
    };

    this.setState({
      body,
      warning: ''
    });
  };

  onUserSelect = (event) => {
    // this.setState((prevState, props) => {
    //   return{
    //     user_id: props.users[event.target.selectedIndex].id
    //   }
    // })
    const selectedIndex = event.target.selectedIndex;

    const { users } = this.props;

    this.setState({
      user_id: users[selectedIndex].id
    })
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { onAddPost } = this.props;
    const { title, body, user_id } = this.state;
    const newPost = {
      title,
      body,
      user_id
    };

    onAddPost && onAddPost(newPost)
  };

  renderUsersSelect = () => {
    const { users } = this.props;
    const { user_id } = this.state;

    const selectedUser = users.find(item => item.id === user_id);
    const selectedFullName = `${selectedUser.first_name} ${selectedUser.last_name}`

    return (
      <select value={selectedFullName} onChange={this.onUserSelect}>
        {
          users.map(user => {
            const fullName = `${user.first_name} ${user.last_name}`
            return (
              <option key={user.id} value={fullName}>{fullName}</option>
            )
          })
        }
      </select>
    )
  };

  render() {
    const { title, body, warning } = this.state;

    return (
      <form class="may-add-post-form" onSubmit={this.onSubmit}>
        {!!warning && <div>{warning}</div>}

        <div class="form-group">
          <label for="formGroupExampleInput1">Title</label>
          <input
            type="text"
            class="form-control"
            id="formGroupExampleInput"
            placeholder="Please enter your title"
            value={title}
            onChange={this.onTitleChange}
          />
        </div>
        <div class="form-group">
          <label for="formGroupExampleInput2">Body</label>
          <textarea
            class="form-control"
            id="formGroupExampleInput"
            placeholder="Please enter text here"
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