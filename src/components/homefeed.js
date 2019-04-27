// Home feed screen for the logged in user.
// Shows all posts made by users the current user
// follows.

import React, { Component } from 'react';
import {connect} from 'react-redux';

class HomeFeed extends Component {

    render() {
        return (
            <div>
                placeholder - HomeFeed
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

export default connect(mapStateToProps)(HomeFeed);