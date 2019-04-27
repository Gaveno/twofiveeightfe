import React, { Component} from 'react';
import { submitRegister } from '../../actions/authActions';
import { connect } from 'react-redux';
import { Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

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
        dispatch(submitRegister(this.state.details));
    }

    render(){
        return (
            <Form horizontal>
                <FormGroup controlId="title">
                    <Col sm={7}>
                    <div style={{'fontSize': '20px'}}>
                        Register Account
                    </div>
                    </Col>
                </FormGroup>
                <FormGroup controlId="name">
                    <Col componentClass={ControlLabel} sm={4} md={3}>
                        First Name
                    </Col>
                    <Col sm={8}>
                        <FormControl onChange={this.updateDetails}
                                     value={this.state.details.name}
                                     type="text" placeholder="First Name" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="username">
                    <Col componentClass={ControlLabel} sm={4} md={3}>
                        Username
                    </Col>
                    <Col sm={8}>
                        <FormControl onChange={this.updateDetails}
                                     value={this.state.details.username}
                                     type="text" placeholder="Username" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="password">
                    <Col componentClass={ControlLabel} sm={4} md={3}>
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
                        <Button onClick={this.register} block>Register</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(Register);