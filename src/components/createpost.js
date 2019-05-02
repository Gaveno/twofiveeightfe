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
import {submitPost} from "../actions/feedActions";
import dummyimage from "../images/dummyimage.jpg";
import {resizeImage} from "../actions/feedActions";
import {dataURLtoFile, dataURItoBlob} from "../actions/helpers";

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
        this.submitPost = this.submitPost.bind(this);
        this.state = {
            details: {
                text: ""
            }
        }
    }

    submitPost() {
        let file = dataURLtoFile('data:image/jpeg;base64,'+this.props.fileUpload, 'img.jpeg');
        /*let canvas = document.createElement('canvas');
        let file = new Blob([window.atob(canvas.toDataURL('image/jpeg').split(',')[1])],
            {type: 'image/jpeg', encoding: 'utf-8'});*/
        //let file = new Blob(['data:image/jpeg;base64,'+this.props.fileUpload], {type: 'image/jpeg', encoding: 'utf-8'});
        //let file = dataURItoBlob(this.props.fileUpload);
        submitPost(file, this.state.details.text);
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
        const numHash = this.state.details.text.split("#").length-1;
        if (length > 258 || numHash > 5) return 'error';
        if (length > 240 || numHash > 4) return 'warning';
        return 'success';
    }

    render() {
        const resized = this.props.imageResized;
        const length = this.state.details.text.length;
        const numHash = this.state.details.text.split("#").length-1;
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
                        <HelpBlock>{length}/258 characters. {numHash}/5 hashtags.</HelpBlock>
                        {(this.getValidationState()==='error' ? <Button disabled>Submit post</Button> :
                            <Button onClick={this.submitPost}>Submit post</Button>)}
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