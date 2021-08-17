import React, { Component } from 'react';

class AddUserForm extends Component {

  firstNameRef = React.createRef();
  lastNameRef = React.createRef();
  emailRef = React.createRef();
  addressRef = React.createRef();

  state = {
    warning: ''
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { onUserAdd } = this.props;

    const firstName = this.firstNameRef.current.value;
    const lastName = this.lastNameRef.current.value;
    const email = this.emailRef.current.value;
    const address = this.addressRef.current.value;

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

    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      address
    };

    onUserAdd && onUserAdd(newUser);

    this.onReset();
  };

  focusInput = () => {
    this.lastNameRef.current.focus();
  };

  onReset = () => {
    this.firstNameRef.current.value = '';
    this.lastNameRef.current.value = '';
    this.emailRef.current.value = '';
    this.addressRef.current.value = '';
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

        <div className="form-group m-2">
          <input
            ref={this.addressRef}
            type="text"
            className="form-control"
            placeholder='Address'
          />
        </div>

        <button type="submit" class="btn btn-primary m-1">Add User</button>
        <button type="button" class="btn btn-secondary m-1" onClick={this.onReset}>Reset</button>
        <button type="reset" class="btn btn-secondary m-1">Reset native</button>
        <button type="button" class="btn btn-success m-1" onClick={this.focusInput}>Focus</button>
      </form>
    );
  }
};

export default AddUserForm;