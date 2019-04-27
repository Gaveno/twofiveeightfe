// Global feed shows all posts created by any user.
// Search bar at top to locate users or
// posts with specific hashtags.

import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppControls from "./appcontrols";

class GlobalFeed extends Component {

    render() {
        return (
            <div>
                placeholder - GlobalFeed
                <AppControls />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

export default connect(mapStateToProps)(GlobalFeed);