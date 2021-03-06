import React, { Component } from 'react';
import Chevron from '../../assets/chevron.png';

import './Panel.scss';

export default class Panel extends Component {

    constructor(props) {
        super(props);

        const {isOpenByDefault} = props;

        this.state = {
            isOpen: isOpenByDefault,
            inputValue: ''
        }
    }

    onClick = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    onChange = (event) => {
        console.log(event);
        console.log(event.target.value);
        this.setState({ inputValue: event.target.value })
    }

    render() {
        const { children, label } = this.props;
        const { isOpen } = this.state;

        return (
            <div className="may-panel card">
                <div className="may-panel-header card-header">
                    <div>{label}</div>
                    <div className={`may-panel-header-chevron ${isOpen ? 'up' : ''}`} onClick={this.onClick}>
                        <img src={Chevron} alt="img" />
                    </div>
                </div>
                {
                    isOpen && (
                        <div className="card-body"> {children} </div>
                    )
                }
            </div>
        )
    }
}
