import React, {Component} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {getPath} from "../actions/helpers";

export default class Username extends Component {
    onClicked() {
        if (getPath() === "userfeed") {
            localStorage.setItem('userScroll', "0");
            window.location.reload();
        }
    }
    render() {
        if (!this.props.username)
            return "@usernotfound";
        else {
            const username = this.props.username;
            return (
                <samp className="username" onClick={this.onClicked}>
                    <LinkContainer to={"/userfeed/" + username.split(" ")[0]}>
                        <b>@{username}</b>
                    </LinkContainer>
                </samp>
            )
        }
    }
}