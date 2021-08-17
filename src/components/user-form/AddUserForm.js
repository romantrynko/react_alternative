import React, { Component } from 'react';

class AddUserForm extends Component {

  firstNameRef = React.createRef();
  lastNameRef = React.createRef();
  emailRef = React.createRef();

  state = {
    warning: ''
  };

  onSubmit = (event) => {
    event.preventDefault();

    console.log(this.firstNameRef.current.value);
    console.log(this.lastNameRef.current.value);

    const firstName = this.firstNameRef.current.value;
    const lastName = this.lastNameRef.current.value;

    const pattern = /^\d+$/;

    if (pattern.test(firstName) || pattern.test(lastName)) {
      this.setState({
        warning: 'Please don\'t type numbers'
      });

      return;
    };

    this.setState({
      warning: ''
    });

    this.firstNameRef.current.value = '';
    this.lastNameRef.current.value = '';

  };

  focusInput = () => {
    this.lastNameRef.current.focus();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
      {!!this.state.warning && <div>{this.state.warning}</div>}

        <label for="formGroupExampleInput">Add new user</label>
        <div className="form-group m-2">
          <input
            ref={this.firstNameRef}
            type="text"
            className="form-control"
            placeholder='First Name'
          />
        </div>

        <div className="form-group m-2">
          <input
            ref={this.lastNameRef}
            type="text"
            className="form-control"
            placeholder='Last Name'
          />
        </div>

        <div className="form-group m-2">
          <input
            ref={this.emailRef}
            type="email"
            className="form-control"
            placeholder='Email'
          />
        </div>
        <button type="submit" class="btn btn-primary m-1">Add User</button>
        <button type="button" class="btn btn-primary m-1" onClick={this.focusInput}>Focus</button>
      </form>
    );
  }
}

export default AddUserForm;