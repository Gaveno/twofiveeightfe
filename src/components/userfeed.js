// Feed to view a particular users posts.
// Shows number of followers and number of following.
// Allows following if not the current user.

import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppControls from "./appcontrols";
import RenderPosts from "./renderposts";
import {fetchGlobalFeed, fetchUserFeed} from "../actions/feedActions";
import {Divider} from "./divider";
import {RenderFollowers} from "./renderfollowers";
import {RenderFollowing} from "./renderfollowing";
import RenderUser from "./renderuser";
import {getScrollPercent} from "../actions/helpers";

class UserFeed extends Component {
    constructor(props) {
        super(props);
        this.setDisplayType = this.setDisplayType.bind(this);
        this.scrolledPage = this.scrolledPage.bind(this);
    }

    setDisplayType(e) {
        let setDisplayType = Object.assign({}, this.state);
        setDisplayType.displayType = e;
        this.setState(setDisplayType);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrolledPage);
        const last = localStorage.getItem('lastFetchUser');
        const {dispatch} = this.props;
        if (this.props.userFeed.length <= 0 || Date.now() - last > 5000) {
            dispatch(fetchUserFeed(0, this.props.userFeed));
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrolledPage);
    }

    scrolledPage() {
        //console.log("Page scrolled: ", getScrollPercent());
        const {dispatch} = this.props;
        const last = localStorage.getItem('lastFetchUser');
        // Make sure last fetch was over 5 seconds ago
        if (Date.now() - last > 5000) {
            if (getScrollPercent() <= 0) {
                dispatch(fetchUserFeed(0, this.props.userFeed));
            } else if (getScrollPercent() > 80) {
                dispatch(fetchUserFeed(this.props.userFeed.length, this.props.userFeed));
            }
        }
    }

    render() {
        if (this.props.displayType === undefined) {
            return (
                <div>
                    Loading...
                </div>
            )
        }
        const RenderUserFeed = ({user, feed}) => {
            return (
                <div className="userInfoContainer">
                        <RenderUser selectedUser={user} />
                        <div className="feed-container">
                            <RenderPosts posts={feed}/>
                            <Divider/>
                            <Divider/>
                            <Divider/>
                            <AppControls/>
                        </div>
                    </div>
                )
        };
        const RenderFollowers = ({followList}) => {
            return(
                <div className="user-followers-container">
                    <Divider />
                    <Divider />
                    <Divider />
                    rendering followers
                </div>
                )
        };
        const RenderFollowing = ({followList}) => {
            return(
                <div className="user-following-container">
                    <Divider />
                    <Divider />
                    <Divider />
                    Rendering following
                </div>
            )
        };
        return (
            <div>
                {(this.props.displayType === 0) ? <RenderUserFeed user={this.props.selectedUser} feed={this.props.userFeed} /> : ""}
                {(this.props.displayType === 1) ? <RenderFollowers followList={this.props.followList} /> : ""}
                {(this.props.displayType === 2) ? <RenderFollowing followList={this.props.followList}/> : ""}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userFeed: state.feed.userFeed,
        selectedUser: state.feed.selectedUser,
        followList: state.feed.followList,
        displayType: state.feed.displayType
    }
};

export default connect(mapStateToProps)(UserFeed);