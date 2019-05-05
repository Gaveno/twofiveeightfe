// Global feed shows all posts created by any user.
// Search bar at top to locate users or
// posts with specific hashtags.

import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppControls from "./appcontrols";
import {FormControl, FormGroup, Col, Grid, Button} from 'react-bootstrap';
import {fetchGlobalFeed, fetchHashtagFeed, fetchUsers, searchFeedFetched, usersFetched} from '../actions/feedActions';
import RenderPosts from './renderposts';
import {Divider} from './divider';
import {getScrollPercent} from "../actions/helpers";
import {RenderFollowers} from "./renderfollowers";

const TYPE_HASHTAG = 0;

class GlobalFeed extends Component {

    constructor(props) {
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
        this.scrolledPage = this.scrolledPage.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onSendSearch = this.onSendSearch.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);

        this.state = {
            details: {
                searchStr: ""
            },
            searchType: TYPE_HASHTAG,
            popup: false
        }
    }

    updateDetails(e) {
        console.log("event: ", e);
        let updateDetails = Object.assign({}, this.state.details);
        updateDetails[e.target.id] = e.target.value;
        const numSpaces = updateDetails.searchStr.split(' ').length - 1;
        if (numSpaces > 0)
            updateDetails.searchStr = updateDetails.searchStr.split(' ')[0];
        this.setState({
            details: updateDetails
        });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrolledPage);
        window.addEventListener('keydown', this.onSearch);
        const last = localStorage.getItem('lastFetchGlobal');
        const {dispatch} = this.props;
        if (this.props.globalFeed.length <= 0 || Date.now() - last > 5000) {
            dispatch(fetchGlobalFeed(0, this.props.globalFeed));
        }
        if (localStorage.getItem('globalScroll')) {
            window.scroll({top: parseInt(localStorage.getItem('globalScroll'))});
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrolledPage);
        window.removeEventListener('keydown', this.onSearch);
        localStorage.setItem('globalScroll', window.scrollY.toString());
    }

    onSearch(e) {
        if (e.key === 'Enter' || e.key === 'Return') {
            this.onSendSearch(this.state.searchType);
        }
    }

    onSendSearch(type) {
        //console.log("send search, state: ", type);
        const last = parseInt((localStorage.getItem('lastSearch') ? localStorage.getItem('lastSearch') : "0"));
        const search = this.state.details.searchStr.toLowerCase();
        const {dispatch} = this.props;
        if (Date.now() - last > 1000) {
            localStorage.setItem('lastSearch', Date.now().toString());
            if (type == TYPE_HASHTAG) {
                if (search.length > 0) {
                    //console.log("searching for hashtag: " + search);
                    const lastTag = (localStorage.getItem('lastHashtag') ? localStorage.getItem('lastHashtag') : "");
                    let newTag = true;
                    if (lastTag.length > 0 && lastTag === search)
                        newTag = false;
                    //console.log("newTag: ", newTag);
                    localStorage.setItem('lastHashtag', search);
                    dispatch(fetchHashtagFeed(0, search, this.props.searchFeed, newTag));
                } else {
                    dispatch(searchFeedFetched([]));
                }
            } else {
                //console.log("searching for user: " + this.state.details.searchStr);
                if (search.length > 0)
                    dispatch(fetchUsers(search));
                else
                    dispatch(usersFetched([]));
            }
        }
    }

    onTypeChange() {
        //console.log("inputE1.value: ", this.inputE1.value);
        this.setState({
            searchType: this.inputE1.value
        });
    }

    scrolledPage() {
        const {dispatch} = this.props;
        const last = localStorage.getItem('lastFetchGlobal');
        if (Date.now() - last > 5000) {
            if (this.props.searchFeed.length <= 0 && this.props.searchUsers.length <= 0) {
                // Make sure last fetch was over 5 seconds ago
                if (getScrollPercent() <= 0) {
                    dispatch(fetchGlobalFeed(0, this.props.globalFeed));
                } else if (getScrollPercent() > 80) {
                    dispatch(fetchGlobalFeed(this.props.globalFeed.length, this.props.globalFeed));
                }
            }
            else {
            // Make sure last fetch was over 5 seconds ago
                if (getScrollPercent() <= 0) {
                    const lastTag = (localStorage.getItem('lastHashtag') ? localStorage.getItem('lastHashtag') : "");
                    let newTag = true;
                    if (lastTag.length > 0 && lastTag === this.state.details.searchStr)
                        newTag = false;
                    localStorage.setItem('lastHashtag', this.state.details.searchStr);
                    dispatch(fetchHashtagFeed(0, this.state.details.searchStr.toLowerCase(), this.props.searchFeed, newTag));
                } else if (getScrollPercent() > 80) {
                    const lastTag = (localStorage.getItem('lastHashtag') ? localStorage.getItem('lastHashtag') : "");
                    let newTag = true;
                    if (lastTag.length > 0 && lastTag === this.state.details.searchStr)
                        newTag = false;
                    localStorage.setItem('lastHashtag', this.state.details.searchStr);
                    dispatch(fetchHashtagFeed(
                        this.props.searchFeed.length,
                        this.state.details.searchStr.toLowerCase(),
                        this.props.searchFeed,
                        newTag));
                }
            }
        }
    }

    render() {
        const type = this.state.searchType;
        return (
            <div className="feed-container">
                <Grid className="post">
                <Col xs={3}>
                    <FormGroup controlId="searchType">
                        <FormControl className="search-type"
                                     inputRef={ e1 => this.inputE1=e1 }
                                     onChange={this.onTypeChange}
                                     componentClass="select"
                                     placeholder="#">
                            <option value={0}>#</option>
                            <option value={1}>@</option>
                        </FormControl>
                    </FormGroup>
                </Col>
                <Col xs={7}>
                    <FormGroup controlId="searchStr">
                        <FormControl className="search-bar"
                                     componentClass="input"
                                     type="text"
                                     onChange={this.updateDetails}
                                     placeholder="Search..."
                                     value={this.state.details.searchStr} />
                    </FormGroup>
                </Col>
                <Col xs={2}>
                    <Button onClick={()=>this.onSendSearch(this.state.searchType)} className="search-button">Search</Button>
                </Col>
                </Grid>
                { (this.props.searchUsers.length <= 0 || type === TYPE_HASHTAG) ?
                    <RenderPosts posts={(this.props.searchFeed.length > 0) ? this.props.searchFeed : this.props.globalFeed} />
                    :
                    <RenderFollowers users={this.props.searchUsers} />
                }

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
        globalFeed: state.feed.globalFeed,
        searchFeed: state.feed.searchFeed,
        searchUsers: state.feed.users
    }
};

export default connect(mapStateToProps)(GlobalFeed);