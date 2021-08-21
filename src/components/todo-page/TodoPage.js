import React, { Component } from 'react';
import { connect } from 'react-redux';
import { accessToken } from '../../constants';
import Dropdown from '../dropdown/Dropdown';
import uniqueId from 'uniqid';
import { addTodo, removeTodo, updateTodo, toggleTodo } from '../../actions';
import TodoCard from './../todo-card/TodoCard';


class TodoPage extends Component {
  state = {
    users: [],
    user: '',
    title: '',
    body: '',
    doneStatus: false,
    isEditMode: false
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

  onAddTodo = () => {
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

    this.resetForm()
  };

  onRemoveToDo = (todo) => {
    const { removeTodo } = this.props;
    return () => {
      removeTodo && removeTodo(todo)
    }
  };

  onEditTodo = (todo) => {
    return () => {
      this.setState({
        isEditMode: true,
        ...todo
      })
    }
  };

  onUpdateTodo = () => {
    const { updateTodo } = this.props;
    const { user, title, body, doneStatus, id } = this.state;

    updateTodo && updateTodo({
      user,
      title,
      body,
      doneStatus,
      id
    });

    this.resetForm()
  };

  onToggleTodo = (id) => {
    

    toggleTodo && toggleTodo(id);
  };

  resetForm = () => {
    this.setState({
      user: '',
      title: '',
      body: '',
      doneStatus: false,
      isEditMode: false,
      id: ''
    });
  };

  render() {
    const { users, user, title, body, doneStatus, isEditMode } = this.state;
    const { todos } = this.props;

    return (
      <div >
        <h3 className='card card-header'>
          Add todo form
        </h3>
        <div className='d-flex flex-column card card-body m-2'>
          <input className='m-2' value={title} onChange={this.onTitleChange} placeholder='Todo title' />
          <textarea className='m-2' value={body} onChange={this.onBodyChange} placeholder='Todo body' />

          <Dropdown options={users} selectedOption={user} onSelect={this.onUserSelect} />

          <div>
            <input className='m-2' type='checkbox' onChange={this.onStatusChange} checked={doneStatus} />
            <span className='m-2'>
              Done
            </span>
          </div>
          <div className='d-flex flex-row w-50'>
            {!isEditMode && <button className='btn btn-info m-2' onClick={this.onAddTodo}>Add todo</button>}
            {isEditMode && <button className='btn btn-success m-2' onClick={this.onUpdateTodo}>Update todo</button>}
          </div>
        </div>

        {
          todos.map(todo => {
            return (
              <TodoCard
                todo={todo}
                key={todo.id}
                onRemoveToDo={this.onRemoveToDo(todo)}
                onEditTodo={this.onEditTodo(todo)}
                onToggleTodo={this.onToggleTodo(todo.id)}
              />
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
  removeTodo,
  updateTodo,
  toggleTodo
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoPage);