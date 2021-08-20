import React, { Component } from 'react';

import { accessToken } from '../../constants';
import Dropdown from '../dropdown/Dropdown';
import { uniqueId } from 'uniqid';
import { ADD_TODO, REMOVE_TODO } from '../../action-types';

class TodoPage extends Component {
  state = {
    users: [],
    user: '',
    title: '',
    body: '',
    doneStatus: false
  };

  componentDidMount() {
    this.loadUsers()
  };

  loadUsers = async () => {
    this.setState({
      isLoading: true
    });

    let response = await fetch(`https://gorest.co.in/public-api/users?access-token=${accessToken}`);

    if (response.ok) {
      let json = await response.json();

      const result = json.data;

      if (Array.isArray(result)) {
        const usersNames = result.map(user => user.id);
        console.log(result);

        this.setState({
          users: usersNames
        });
      }
    }
  };

  onBodyChange = (event) => {
    const body = event.target.value
    this.setState({
      body
    })
  };

  onTitleChange = (event) => {
    const title = event.target.value
    this.setState({
      title
    })
  };

  onUserSelect = (userName) => {
    this.setState({
      user: userName
    })
  };

  onStatusChange = (event) => {
    this.setState({
      doneStatus: event.target.checked
    })
  };

  addTodo = () => {
    const { user, title, body, doneStatus } = this.state;

    const newTodo = {
      id: uniqueId(),
      user,
      title,
      body,
      doneStatus
    }
  };

  render() {
    const { users, user, title, body, doneStatus } = this.state;
    return (
      <div>
        <h3 className='m-2'>
          Add todo form
        </h3>
        <form className='d-flex flex-column m-2'>
          <input className='m-2' value={title} onChange={this.onTitleChange} />
          <textarea className='m-2' value={body} onChange={this.onBodyChange} />

          <Dropdown options={users} selectedOption={user} onSelect={this.onUserSelect} />

          <div>
            <input className='m-2' type='checkbox' onChange={this.onStatusChange} checked={doneStatus} />
            <span className='m-2'>
              Done
            </span>
          </div>
          <button className='btn btn-primary' onClick={this.addTodo}>Add todo</button>
        </form>
      </div>
    );
  };
};

const mapStateToProps = (store) => {
  const { todoReducer: { todos } } = store;

  return {
    todos
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (todo) => dispatch(addTodo(todo)),
    removeTodo: (todo) => dispatch(removeTodo(todo))
  }
}

export default TodoPage;