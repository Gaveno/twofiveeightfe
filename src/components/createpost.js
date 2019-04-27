// Creating post screen.
// Options should include uploading a photo,
// taking a photo, and then selecting the crop.
// Photo must be resized/cropped to 258x258.
// NOTE: server should reject photos not 258x258.

import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppControls from "./appcontrols";

class CreatePost extends Component {

    render() {
        return (
            <div>
                placeholder - CreatePost
                <AppControls />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
};

export default connect(mapStateToProps)(CreatePost);