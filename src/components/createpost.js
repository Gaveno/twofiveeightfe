// Creating post screen.
// Options should include uploading a photo,
// taking a photo, and then selecting the crop.
// Photo must be resized/cropped to 258x258.
// NOTE: server should reject photos not 258x258.

import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppControls from "./appcontrols";
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const cameraResolution = {
    width: 258,
    height: 258,
};

class CreatePost extends Component {
    onTakePhoto(dataUri) {
        // TO-DO: do stuff with the image
        console.log('takePhoto');
    }
    render() {
        return (
            <div>
                <div className="App">
                    Create post placeholder
                </div>
                <AppControls />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fileUpload: state.feed.fileUpload,
    }
};

export default connect(mapStateToProps)(CreatePost);