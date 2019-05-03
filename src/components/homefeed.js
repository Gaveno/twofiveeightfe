// Home feed screen for the logged in user.
// Shows all posts made by users the current user
// follows.

import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppControls from './appcontrols';
import {fetchHomeFeed} from "../actions/feedActions";
import RenderPosts from "./renderposts";
import {Divider} from "./divider";

class HomeFeed extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchHomeFeed());
    }

    render() {
        return (

            <div className="feed-container">
                <RenderPosts posts={this.props.homeFeed} />
                <Divider />
                <Divider />
                <Divider />
                <AppControls />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        homeFeed: state.feed.homeFeed
    }
};

export default connect(mapStateToProps)(HomeFeed);