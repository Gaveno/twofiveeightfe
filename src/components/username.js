import React, {Component} from 'react';
import {LinkContainer} from 'react-router-bootstrap';

export default class Username extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const username = this.props.username;
        return (
            <LinkContainer to={"/userfeed/"+username}>
                <b>@{username}</b>
            </LinkContainer>
        )
    }
}