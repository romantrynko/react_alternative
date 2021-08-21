import React from 'react';
import './TodoCard.scss';

export default function TodoCard(props) {
  const { todo, onEditTodo, onRemoveToDo, onToggleTodo } = props;

  if (!todo) return null;

  const onClickEditTodo = () => {
    onEditTodo()
  };

  const onClickRemoveToDo = () => {
    onRemoveToDo()
  };

  const onClickToggleTodo = ({ target: { checked }}) => {
    console.log(checked);
    onToggleTodo(checked)
  };

  const { user, title, body, doneStatus, id } = todo;
  return (
    <div key={id} className='card card-body m-2'>
      <div>User: {user}</div>
      <div>Title: {title}</div>
      <div>Body: {body}</div>
      <div>
        Done:
        <input className='m-2' type='checkbox' onChange={onClickToggleTodo} checked={doneStatus}/>
      </div >
      <div className='d-flex flex-row w-25'>
        <button className='btn btn-secondary m-2' onClick={onClickEditTodo}>Edit</button>
        <button className='btn btn-danger m-2' onClick={onClickRemoveToDo}>Remove</button>
      </div>
    </div>
  )
};
