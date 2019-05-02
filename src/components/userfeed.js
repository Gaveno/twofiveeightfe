// Feed to view a particular users posts.
// Shows number of followers and number of following.
// Allows following if not the current user.

import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppControls from "./appcontrols";
import RenderPosts from "./renderposts";
import {fetchUserFeed} from "../actions/feedActions";
import {Divider} from "./divider";
import {RenderFollowers} from "./renderfollowers";
import {RenderFollowing} from "./renderfollowing";
import RenderUser from "./renderuser";

class UserFeed extends Component {
    constructor(props) {
        super(props);
        this.setDisplayType = this.setDisplayType.bind(this);

        this.state = {
            displayType: 0
        }
    }

    setDisplayType(e) {
        let setDisplayType = Object.assign({}, this.state);
        setDisplayType.displayType = e;
        this.setState(setDisplayType);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchUserFeed());
    }

    render() {
        const displayType = this.state.displayType;
console.log(displayType);
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

                </div>
                )
        };
        const RenderFollowing = ({followList}) => {
            return(
                <div className="user-following-container">

                </div>
            )
        };
        return (
            <div>
                {(displayType === 0) ? <RenderUserFeed user={this.props.selectedUser} feed={this.props.userFeed} /> : ""}
                {(displayType === 1) ? <RenderFollowers followList={this.props.followList} /> : ""}
                {(displayType === 2) ? <RenderFollowing followList={this.props.followList}/> : ""}
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