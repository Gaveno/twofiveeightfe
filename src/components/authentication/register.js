import React, { Component} from 'react';
import { submitRegister } from '../../actions/authActions';
import { connect } from 'react-redux';
import { Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import {setLoading} from "../../actions/feedActions";
import Loader from "../small/loader";

class Register extends Component {

    constructor(props){
        super(props);

        this.updateDetails = this.updateDetails.bind(this);
        this.register = this.register.bind(this);
        this.state = {
            details:{
                name: '',
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

    register(){
        const {dispatch} = this.props;
        dispatch(setLoading());
        dispatch(submitRegister(this.state.details));
    }

    render(){
        return (
            <Form horizontal>
                <FormGroup controlId="title">
                    <Col>
                    <div style={{'fontSize': '20px'}}>
                        <b>Register Account</b>
                    </div>
                    </Col>
                </FormGroup>
                <FormGroup controlId="name">
                    <Col componentClass={ControlLabel}>
                        First Name
                    </Col>
                    <Col>
                        <FormControl className="auth-item" onChange={this.updateDetails}
                                     value={this.state.details.name}
                                     type="text" placeholder="First Name" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="username">
                    <Col componentClass={ControlLabel}>
                        Username
                    </Col>
                    <Col>
                        <FormControl className="auth-item" onChange={this.updateDetails}
                                     value={this.state.details.username}
                                     type="text" placeholder="Username" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="password">
                    <Col componentClass={ControlLabel}>
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
                        <Button onClick={this.register} className="auth-item">Register</Button>
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
}

export default connect(mapStateToProps)(Register);