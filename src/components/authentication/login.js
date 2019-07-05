import React, { Component } from 'react';
import { submitLogin } from '../../actions/authActions';
import { connect } from 'react-redux';
import { Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import {setLoading} from "../../actions/feedActions";
import Loader from "../small/loader";

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
        dispatch(setLoading());
        dispatch(submitLogin(this.state.details));
    }

    render(){
        return (
            <Form horizontal>
                <FormGroup controlId="title">
                    <Col>
                    <div style={{'fontSize': '20px'}}>
                        <b>Login to Account</b>
                    </div>
                    </Col>
                </FormGroup>
                <FormGroup controlId="username">
                    <Col componentClass={ControlLabel}>
                        <b>Username</b>
                    </Col>
                    <Col>
                        <FormControl className="auth-item" onChange={this.updateDetails}
                                     value={this.state.details.username}
                                     type="text" placeholder="Username" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="password">
                    <Col componentClass={ControlLabel} >
                        Password
                    </Col>
                    <Col>
                        <FormControl className="auth-item" onChange={this.updateDetails}
                                     value={this.state.details.password}
                                     type="password" placeholder="Password" />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col>
                        <Button onClick={this.login} className="auth-item">Sign in</Button>
                    </Col>
                </FormGroup>
                <Loader />
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
};

export default connect(mapStateToProps)(Login);