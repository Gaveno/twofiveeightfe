import React, {Component} from 'react';
import {LinkContainer} from 'react-router-bootstrap';

export default class Username extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (!this.props.username)
            return "@usernotfound";
        else {
            const username = this.props.username;
            return (
                <LinkContainer to={"/userfeed/" + username.split(" ")[0]}>
                    <b>@{username}</b>
                </LinkContainer>
            )
        }
    }
}