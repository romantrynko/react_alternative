import React, { Component } from 'react';
import Chevron from '../../assets/chevron-down.png';
import './Panel.scss';

class PanelFromLecture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      placeholder: 'input your text here'
    }
  };

  onClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  };

  onChange = (event) => {
    this.setState({
      placeholder: event.target.value
    })
  };

  render() {
    const { children, label } = this.props;
    const { isOpen } = this.state;

    return (
      <div className='may-panel card'>

        <input placeholder={this.state.placeholder} onChange={this.onChange}/>

        <div className='may-panel-header card-header'>
          <div>{label}</div>
          <div className={`may-panel-header-chevron ${isOpen ? 'up' : ''}`}>
            <img src={Chevron} alt='Chevron' onClick={this.onClick}/>
          </div>
        </div>
        {
          !!isOpen && <div>{children}</div>
        }

      </div>
    )
  };
};

export default PanelFromLecture;