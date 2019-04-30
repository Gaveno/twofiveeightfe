// Feed to view a particular users posts.
// Shows number of followers and number of following.
// Allows following if not the current user.

import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppControls from "./appcontrols";
import {RenderPosts} from "./renderposts";
import {RenderUser} from "./renderuser";
import {fetchUserFeed} from "../actions/feedActions";
import {Divider} from "./divider";

class UserFeed extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchUserFeed());
    }

    //instagram user page
    //click followers and get all followers
    //follow button to follow that user
        //if the user is us, cannot follow ourselves
        //if we already follow them, cannot follow them again
    //see all out posts
    render() {
        return (
            <div className="userInfoContainer">
                <RenderUser user={this.props.selectedUser} />
                <div className="feed-container">
                     <RenderPosts posts={this.props.userFeed} />
                     <Divider />
                     <Divider />
                     <Divider />
                     <AppControls />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userFeed: state.feed.userFeed,
        selectedUser: state.feed.selectedUser
    }
};

export default connect(mapStateToProps)(UserFeed);