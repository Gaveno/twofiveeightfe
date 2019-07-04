import React, { Component} from 'react';
import { connect } from 'react-redux'
import Login from './login';
import Register from './register';
import { logoutUser } from '../../actions/authActions';
import { Button, Col } from 'react-bootstrap';
import {Divider} from "../small/divider";
import About from "./about"
import {Spacer} from "../small/spacer";
import {AuthFooter} from "./authfooter";

class Authentication extends Component {

    constructor(props){
        super(props);

        this.state = {
            screen: 0
        };
    }

    componentDidMount(){

    }
    showAbout() {
        this.setState({
            screen: 0
        });
    }

    showLogin(){
        this.setState({
            screen: 1
        });
    }

    showReg(){
        this.setState({
            screen: 2
        });
    }

    logout(){
        this.props.dispatch(logoutUser());
    }

    render(){

        const userNotLoggedIn = (
                <div className="auth">
                    <Col>
                        <Spacer />
                        <div>
                            <Button onClick={this.showAbout.bind(this)} className="auth-option">
                                <b>About</b>
                            </Button>
                        </div>
                        <div>
                            <Button onClick={this.showLogin.bind(this)} className="auth-option">
                                <b>Login</b>
                            </Button>
                        </div>
                        <div>
                            <Button onClick={this.showReg.bind(this)} className="auth-option">
                                <b>Register</b>
                            </Button>
                        </div>
                    </Col>
                    {this.props.error && this.props.error.length > 0 ?
                        <div>
                            <Divider />
                            <b className="error-message">{this.props.error}</b>
                        </div>
                        :
                        ""
                    }
                    <div className="auth-container">
                        { (this.state.screen === 0) ?
                            <About />
                            : ""
                        }
                        { (this.state.screen === 1) ?
                            <Login />
                            : ""
                        }
                        { (this.state.screen === 2) ?
                            <Register />
                            : ""
                        }
                    </div>
                    <Spacer />
                    <Spacer />
                    <AuthFooter />
                </div>
        );
        const userLoggedIn = (
            <div>Logged in as: {this.props.username} <button onClick={this.logout.bind(this)}>Logout</button></div>
        );

        return (
            <div>
                {this.props.loggedIn ? userLoggedIn : userNotLoggedIn}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        username: state.auth.username,
        error: state.auth.error
    }
};

export default connect(mapStateToProps)(Authentication)