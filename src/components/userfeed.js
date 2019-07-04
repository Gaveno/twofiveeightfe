// Feed to view a particular users posts.
// Shows number of followers and number of following.
// Allows following if not the current user.

import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppControls from "./appcontrols";
import RenderPosts from "./renderposts";
import {fetchUserFeed, userFeedFetchedNOU} from "../actions/feedActions";
import {Divider} from "./small/divider";
import {RenderFollowers} from "./renderfollowers";
import RenderUser from "./renderuser";
import {getPathUser, getScrollPercent} from "../actions/helpers";
import {Button} from "react-bootstrap";
//import btnClose from "../images/btnClose.png";

class UserFeed extends Component {
    constructor(props) {
        super(props);
        this.setDisplayType = this.setDisplayType.bind(this);
        this.scrolledPage = this.scrolledPage.bind(this);
        this.onClickClose = this.onClickClose.bind(this);
        this.onClickFollowArea = this.onClickFollowArea.bind(this);
    }

    setDisplayType(e) {
        let setDisplayType = Object.assign({}, this.state);
        setDisplayType.displayType = e;
        this.setState(setDisplayType);
    }

    onClickClose() {
        const {dispatch} = this.props;
        dispatch(userFeedFetchedNOU(this.props.userFeed));
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrolledPage);
        const last = localStorage.getItem('lastFetchUser');
        const {dispatch} = this.props;
        if (this.props.userFeed.length <= 0 || Date.now() - last > 5000) {
            dispatch(fetchUserFeed(0, this.props.userFeed));
        }
        if (localStorage.getItem('userScroll'))
            window.scroll({top: parseInt(localStorage.getItem('userScroll'))});
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrolledPage);
        localStorage.setItem('userScroll', window.scrollY.toString());
    }

    scrolledPage() {
        //console.log("Page scrolled: ", getScrollPercent());
        const {dispatch} = this.props;
        const last = localStorage.getItem('lastFetchUser');
        if(this.props.displayType !== 0)
        {
            return;
        }
        // Make sure last fetch was over 5 seconds ago
        if (Date.now() - last > 5000) {
            if (getScrollPercent() <= 0) {
                dispatch(fetchUserFeed(0, this.props.userFeed));
            } else if (getScrollPercent() > 80) {
                dispatch(fetchUserFeed(this.props.userFeed.length, this.props.userFeed));
            }
        }
    }

    onClickFollowArea() {
        if (this.props.selectedUser.username !== getPathUser()) {
            window.location.reload();
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
                    <div>
                        <RenderPosts posts={feed}/>
                        <Divider/>
                        <Divider/>
                        <Divider/>
                    </div>
                )
        };
        const Followers = ({title, followList}) => {
            return(
                <div className="user-followers-container">
                    <b>{title}</b>
                    <Button onClick={this.onClickClose} className="userlist-close">
                        Close
                    </Button>
                    <Divider />
                    <div onClick={this.onClickFollowArea}>
                        <RenderFollowers users={followList} />
                    </div>
                    <Divider />
                    <Divider />
                    <Divider />
                </div>
                )
        };
        return (
            <div>
                <div>
                    <RenderUser />
                </div>
                <div className="feed-container">
                    {(this.props.displayType === 0) ? <RenderUserFeed user={this.props.selectedUser} feed={this.props.userFeed} /> : ""}
                    {(this.props.displayType === 1) ? <Followers title="Followers" followList={this.props.followList} /> : ""}
                    {(this.props.displayType === 2) ? <Followers title="Following" followList={this.props.followList}/> : ""}
                </div>
                <AppControls/>
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