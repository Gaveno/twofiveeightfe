// Feed to view a particular users posts.
// Shows number of followers and number of following.
// Allows following if not the current user.

import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppControls from "./appcontrols";

class UserFeed extends Component {

    render() {
        return (
            <div>
                placeholder - UserFeed
                <AppControls />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

export default connect(mapStateToProps)(UserFeed);