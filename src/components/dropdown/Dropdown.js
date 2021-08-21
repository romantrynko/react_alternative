import React, { Component } from 'react';

import './Dropdown.scss';

class Dropdown extends Component {

  state = {
    isOpen: false
  };

  dropDownRef = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.onClose);
  };

  componentWillUnmount() {
    document.removeEventListener('click', this.onClose);
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  };

  onOptionSelect = (event) => {
    const { onSelect } = this.props;

    const value = event.target.getAttribute('data-value');
    console.log(value);

    onSelect(value);

    this.setState({
      isOpen: false
    });
  };

  onClose = (event) => {
    if (this.dropDownRef && !this.dropDownRef.current.contains(event.target)) {

      this.setState({
        isOpen: false
      });
    }
  };

  render() {
    const { options = [], selectedOption } = this.props;
    const { isOpen } = this.state;

    return (
      <div className='may-drop-down dropdown' ref={this.dropDownRef}>
        <div className='dropdown-toggle m-2' onClick={this.toggle} >User: {selectedOption}</div>
        {
          !!isOpen && <div className='may-drop-down-option-wrapper dropdown-menu show'>
            {
              options.map(option => {
                return (
                  <div
                    className='may-drop-down-option-wrapper-option dropdown-item'
                    key={option}
                    data-value={option}
                    onClick={this.onOptionSelect}
                  >
                    {option}
                  </div>
                )
              })
            }
          </div>
        }
      </div>
    );
  }
}

export default Dropdown;