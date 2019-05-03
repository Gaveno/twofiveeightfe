import React, { Component } from 'react';
import { submitLogin } from '../../actions/authActions';
import { connect } from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import { Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class Login extends Component {

    constructor(props) {
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            details:{
                username: '',
                password: ''
            }
        };
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    login() {
        const {dispatch} = this.props;
        dispatch(submitLogin(this.state.details));
    }

    render(){
        return (
            <Form horizontal>
                <FormGroup controlId="title">
                    <Col sm={7}>
                    <div style={{'fontSize': '20px'}}>
                        <b>Login to Account</b>
                    </div>
                    </Col>
                </FormGroup>
                <FormGroup controlId="username">
                    <Col componentClass={ControlLabel} sm={3} lg={2}>
                        <b>Username</b>
                    </Col>
                    <Col sm={8}>
                        <FormControl onChange={this.updateDetails}
                                     value={this.state.details.username}
                                     type="text" placeholder="Username" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="password">
                    <Col componentClass={ControlLabel} sm={3} lg={2}>
                        Password
                    </Col>
                    <Col sm={8}>
                        <FormControl onChange={this.updateDetails}
                                     value={this.state.details.password}
                                     type="password" placeholder="Password" />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col xs={9}>
                        <Button onClick={this.login} block>Sign in</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
};

export default connect(mapStateToProps)(Login);