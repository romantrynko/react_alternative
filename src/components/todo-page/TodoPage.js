import React, { Component } from 'react';
import { connect } from 'react-redux';
import { accessToken } from '../../constants';
import Dropdown from '../dropdown/Dropdown';
import uniqueId from 'uniqid';
import { addTodo, removeTodo } from '../../actions';


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
        const usersNames = result.map(user => user.name);

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
    const { addTodo } = this.props;

    const newTodo = {
      id: uniqueId(),
      user,
      title,
      body,
      doneStatus
    };

    addTodo && addTodo(newTodo);

    this.setState({
      user: '',
      title: '',
      body: '',
      doneStatus: false
    });
  };

  removeToDo = (todo) => {
    const { removeTodo } = this.props;
    return () => {
      removeTodo && removeTodo(todo)
    }
  }

  render() {
    const { users, user, title, body, doneStatus } = this.state;
    const { todos } = this.props;

    return (
      <div>
        <h3 className='m-2'>
          Add todo form
        </h3>
        <div className='d-flex flex-column m-2'>
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
        </div>


        {
          todos.map(todo => {
            const { user, title, body, doneStatus, id } = todo;
            return (
              <div key={id} className='card card-body m-2'>
                <div>User: {user}</div>
                <div>Title: {title}</div>
                <div>Body: {body}</div>
                <div>Is done ? {doneStatus ? 'yes' : 'no'}</div >
                <button className='btn btn-primary' onClick={this.removeToDo(todo)}>Remove</button>
              </div>
            )
          })
        }

      </div>
    );
  };
};

const mapStateToProps = (store) => {
  const { todoReducer: { todos } } = store;
  return {
    todos
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addTodo: (todo) => dispatch(addTodo(todo)),
//     removeTodo: (todo) => dispatch(removeTodo(todo))
//   }
// };


const mapDispatchToProps = ({
  addTodo,
  removeTodo
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoPage);