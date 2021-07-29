import React, { Component } from 'react';

class AddUserForm extends Component {
  constructor(props) {
    super(props);

    this.firstNameRef = React.createRef();
  };

  onSubmit = (event) => {
    event.preventDefault();


  }

  render() {
    return (
        <form onSubmit={this.onSubmit}>
          <div class="form-group">
            <label for="formGroupExampleInput1">Title</label>
            <input
              ref={this.firstNameRef}
              type="text"
              class="form-control"
              id="formGroupExampleInput"
            />
          </div>
        </form>
    );
  }
}

export default AddUserForm;