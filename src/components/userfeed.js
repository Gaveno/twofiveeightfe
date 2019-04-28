// Feed to view a particular users posts.
// Shows number of followers and number of following.
// Allows following if not the current user.

import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppControls from "./appcontrols";
import {RenderPosts} from "./renderposts";
import {fetchUserFeed} from "../actions/feedActions";

class UserFeed extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchUserFeed());
    }

    render() {
        return (

            <div className="feed-container">
                <RenderPosts posts={this.props.userFeed} />
                <AppControls />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userFeed: state.feed.userFeed
    }
};

export default connect(mapStateToProps)(UserFeed);