// Home feed screen for the logged in user.
// Shows all posts made by users the current user
// follows.

import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppControls from './appcontrols';
import {fetchHomeFeed} from "../actions/feedActions";
import RenderPosts from "./renderposts";
import {Spacer} from "./small/spacer";
import {getScrollPercent} from "../actions/helpers";
import Loader from "./small/loader";

class HomeFeed extends Component {
    constructor(props) {
        super(props);
        this.scrolledPage = this.scrolledPage.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrolledPage);
        const last = localStorage.getItem('lastFetchHome');
        const {dispatch} = this.props;
        if (this.props.homeFeed.length <= 0 || Date.now() - last > 5000) {
            dispatch(fetchHomeFeed(0, this.props.homeFeed));
        }
        if (localStorage.getItem('homeScroll')) {
            window.scroll({top: parseInt(localStorage.getItem('homeScroll'))});
            let posts = document.getElementsByClassName("post");
            for (let i = 0; i < posts.length; i++)
                posts[i].style.animation = "none";
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrolledPage);
        localStorage.setItem('homeScroll', window.scrollY.toString());
    }

    scrolledPage() {
        //console.log("Page scrolled: ", getScrollPercent());
        const {dispatch} = this.props;
        const last = localStorage.getItem('lastFetchHome');
        // Make sure last fetch was over 5 seconds ago
        if (Date.now() - last > 5000) {
            if (getScrollPercent() <= 0) {
                dispatch(fetchHomeFeed(0, this.props.homeFeed));
            } else if (getScrollPercent() > 80) {
                dispatch(fetchHomeFeed(this.props.homeFeed.length, this.props.homeFeed));
            }
        }
    }

    render() {
        return (

            <div className="feed-container">
                <RenderPosts posts={this.props.homeFeed} />
                {(localStorage.getItem('loading')==="true") ? <Loader /> : ""}
                <Spacer />
                <Spacer />
                <Spacer />
                <AppControls />
                <Loader />
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