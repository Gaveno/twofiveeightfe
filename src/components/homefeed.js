// Home feed screen for the logged in user.
// Shows all posts made by users the current user
// follows.

import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppControls from './appcontrols';

class HomeFeed extends Component {

    render() {
        return (
            <div>
                placeholder - HomeFeed
                <AppControls />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

export default connect(mapStateToProps)(HomeFeed);