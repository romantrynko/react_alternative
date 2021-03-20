import React, { Component, createRef } from 'react';

class Test extends Component {

    submitRef = createRef();

    onSubmit = (e) => {
        e.preventDefault();

        console.log(this.submitRef.current.value);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <label htmlFor="Test">Test input</label>
                    <input
                        type="text"
                        ref={this.submitRef}
                        id="testInput"
                        placeholder="test"
                    />
                </div>
                <button type='submit' className="btn btn-primary m-2">Submit</button>
            </form>
        );
    }
}

export default Test;