// Feed to view a particular users posts.
// Shows number of followers and number of following.
// Allows following if not the current user.

import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppControls from "./appcontrols";
import RenderPosts from "./renderposts";
import {fetchUserFeed, setLoading, userFeedFetchedNOU} from "../actions/feedActions";
import {Spacer} from "./small/spacer";
import {Divider} from './small/divider';
import {RenderFollowers} from "./renderfollowers";
import RenderUser from "./renderuser";
import {getPathUser, getScrollPercent} from "../actions/helpers";
import {Button} from "react-bootstrap";
import Loader from "./small/loader";
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
        if (localStorage.getItem('userScroll')) {
            window.scroll({top: parseInt(localStorage.getItem('userScroll'))});
            let posts = document.getElementsByClassName("post");
            for (let i = 0; i < posts.length; i++)
                posts[i].style.animation = "none";
        }
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

                </div>
                )
        };
        return (
            <div>
                <div>
                    <RenderUser />
                </div>
                <div className="feed-container">
                    {(this.props.displayType === 0) ?
                        <RenderPosts posts={this.props.userFeed} /> : ""
                    }
                    {(this.props.displayType === 1) ?
                        <Followers title="Followers" followList={this.props.followList} /> : ""
                    }
                    {(this.props.displayType === 2) ?
                        <Followers title="Following" followList={this.props.followList}/> : ""
                    }
                </div>
                <Spacer />
                <Spacer />
                <Spacer />
                <AppControls/>
                <Loader />
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