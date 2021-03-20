import React, { Component, createRef } from 'react';

class AddUserForm extends Component {

    firstNameRef = createRef();
    lastNameRef = createRef();
    emailRef = createRef();

    state = {
        warning: ''
    }

    onSubmit = (e) => {
        e.preventDefault();

        console.log(this.firstNameRef.current.value);
        console.log(this.lastNameRef.current.value);

        const firstName = this.firstNameRef.current.value;
        const lastName = this.lastNameRef.current.value;
        const email = this.emailRef.current.value;

        const pattern = /\d+/;
        if (pattern.test(firstName) || pattern.test(lastName)) {
            this.setState({
                warning: 'no numbers allowed'
            });
            return
        }
    }

    render() {
        const { warning } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                {!!warning && <div>{warning}</div>}
                <div className="form-group">
                    <label htmlFor="firstNameInput">First name</label>
                    <input
                        ref={this.firstNameRef}
                        type="text"
                        className="form-control"
                        id="firstNameInput"
                        placeholder="First name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastNameInput">Last name</label>
                    <input
                        ref={this.lastNameRef}
                        type="text"
                        className="form-control"
                        id="lastNameInput"
                        placeholder="Last name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="emailInput">Email:</label>
                    <input
                        ref={this.emailRef}
                        type="text"
                        className="form-control"
                        id="emailInput"
                        placeholder="Email"
                    />
                </div>
                
                <button type='submit' className="btn btn-primary m-2">Add</button>
            </form>
        );
    }
}

export default AddUserForm;