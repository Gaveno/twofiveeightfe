// Creating post screen.
// Options should include uploading a photo,
// taking a photo, and then selecting the crop.
// Photo must be resized/cropped to 258x258.
// NOTE: server should reject photos not 258x258.

import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppControls from "./appcontrols";
import {FormControl, FormGroup} from "react-bootstrap";
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

    render() {
        const resized = this.props.imageResized;
        /*console.log("resized: "+resized);
        if (resized) {
            console.log("img render after resize: "+this.props.fileUpload);
        }*/
        return (
            <div className="feed-container">
                <div className="post">
                    <FormGroup controlId="text">
                        {resized ?
                            <img className="post-image"
                                 src={`data:image/jpeg;base64,${this.props.fileUpload}`}
                                 alt="new post" />
                                 : <b>loading</b>
                        }

                         <FormControl onChange={this.updateDetails}
                                      value={this.state.details.text}
                                      componentClass="textarea"
                                      placeholder="What about it...?"
                         />
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