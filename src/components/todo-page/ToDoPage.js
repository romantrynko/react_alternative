import React, { Component } from 'react';
import { accessToken } from '../../constants';
import { DropDown } from '../drop-down/DropDown';
import { uniqId } from 'generate-unique-id';
import { addTodo, removeTodo } from '../../actions';
import { connect } from 'react-redux';

class ToDoPage extends Component {
  state = {
    users: [],
    user: '',
    title: '',
    body: '',
    doneStatus: false
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = async () => {
    let response = await fetch(`https://gorest.co.in/public-api/users?access-token=${accessToken}`);

    if (response.ok) {
      let result = await response.json();

      const { data } = result;

      if (Array.isArray(data)) {
        const userNames = data.map(user => user.name);

        this.setState({
          users: userNames
        });
      }
    }
  };

  onBodyChange = (event) => {
    const body = event.target.value;

    this.setState({
      body
    })
  }

  onTitleChange = (event) => {
    const title = event.target.value;

    this.setState({
      title
    })
  }

  onUserSelect = (userName) => {
    return () => {
      this.setState({
        user: userName
      })
    }
  }

  onStatusChange = (event) => {
    this.setState({
      doneStatus: event.target.checked
    })
  }

  addTodo = () => {
    const { user, title, body, doneStatus } = this.state;
    const { addTodo } = this.props;
    const newTodo = {
      id: uniqId(),
      user,
      title,
      body,
      doneStatus
    };
    addTodo && addTodo(newTodo);
  }

  render() {
    const { users, user, title, body, doneStatus } = this.state
    return (
      <div>
        Add todo form
        <form className="d-flex flex-column m-2 w-50">
          <input className="m-2" value={title} onChange={this.onTitleChange} />
          <textarea className="m-2" value={body} onChange={this.onBodyChange} />

          <DropDown options={users} selectedOption={user} onSelect={this.onUserSelect} />

          <div>
            <input className="m-1" type="checkbox" onChange={this.onStatusChange} checked={doneStatus} />
            <span className="m-1"></span>
          </div>
          <button className="btn btn-primary m-2 w-50" onClick={this.addTodo}>Add todo</button>
        </form>
      </div>
    );
  }
};

const mapStateToProps = (store) => {
  const { todoReducer: { todos } } = store;
  return {
    todos
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (todo) => dispatch(addTodo(todo)),
    removeTodo: (todo) => dispatch(removeTodo(todo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoPage);