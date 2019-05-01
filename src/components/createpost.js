// Creating post screen.
// Options should include uploading a photo,
// taking a photo, and then selecting the crop.
// Photo must be resized/cropped to 258x258.
// NOTE: server should reject photos not 258x258.

import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppControls from "./appcontrols";
import {FormControl, FormGroup, Button, ControlLabel, HelpBlock} from "react-bootstrap";
import {Divider} from './divider';
import dummyimage from "../images/dummyimage.jpg";
import {resizeImage} from "../actions/feedActions";

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
        this.state = {
            details: {
                text: ""
            }
        }
    }

    updateDetails(e) {
        let updateDetails = Object.assign({}, this.state.details);
        updateDetails[e.target.id] = e.target.value;
        this.setState({
            details: updateDetails
        });
    }

    componentDidMount() {
        if (!this.props.fileUpload) {
            window.location.href = "/#/homefeed";
        }
        if (!this.props.imageResized) {
            const {dispatch} = this.props;
            dispatch(resizeImage(this.props.fileUpload));
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.fileUpload) {
            window.location.href = "/#/homefeed";
        }
        if (!this.props.imageResized) {
            const {dispatch} = this.props;
            dispatch(resizeImage(this.props.fileUpload));
        }
    }

    getValidationState() {
        const length = this.state.details.text.length;
        if (length > 258) return 'error';
        if (length > 240) return 'warning';
        return 'success';
    }

    render() {
        const resized = this.props.imageResized;
        const length = this.state.details.text.length;
        /*console.log("resized: "+resized);
        console.log("img: "+this.props.fileUpload);*/
        /*if (resized) {
            console.log("img render after resize: "+this.props.fileUpload);
        }*/
        return (

            <div className="feed-container">
                <div className="post">
                    <FormGroup controlId="text"
                               validationState={this.getValidationState()}
                    >
                        {resized ?
                            <img className="post-image"
                                 src={`data:image/jpeg;base64,${this.props.fileUpload}`}
                                 alt="new post" />
                                 : <b>loading</b>
                        }
                        <Divider />
                        <ControlLabel>Description</ControlLabel>
                        <FormControl onChange={this.updateDetails}
                                     value={this.state.details.text}
                                     componentClass="textarea"
                                     placeholder="What about it...?"
                        />
                        <HelpBlock>{length}/258 characters</HelpBlock>
                        <Button>Submit post</Button>
                        <Divider />
                        <Divider />
                        <Divider />
                    </FormGroup>
                </div>
                <AppControls />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fileUpload: state.feed.fileUpload,
        imageResized: state.feed.imageResized
    }
};

export default connect(mapStateToProps)(CreatePost);