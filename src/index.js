import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const test = React.createElement('div', {
  id: 'test-id',
  className: 'test-class',
  onClick: () => { alert('hello') }
}, <div>Hello</div>);

const onClick = () => { alert('hello on custom button') };

const btnId = 'btn-test-id';

const CustomButton = (props) => {
  console.log(props);
  const { id, children } = props;

  return (
    <button onClick={onClick} id={id}>{children}</button>
  );
};

const testBtn = React.createElement(CustomButton, {
  id: 'btn-test-2'
}, 'Click me');

ReactDOM.render(
  <CustomButton id={btnId}>asfaf</CustomButton>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
