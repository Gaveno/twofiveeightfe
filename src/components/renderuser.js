import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Button, Col, Grid, Row} from "react-bootstrap";
import defaultProfilePhoto from "../images/defaultProfilePhoto.png";
import profilePhotoCrop from "../images/profilePhotoCrop.png";
import {Divider} from './divider';
import {fetchFollowers, fetchGlobalFeed} from "../actions/feedActions";
import {fetchFollowing} from "../actions/feedActions";

class RenderUser extends Component {
    constructor(props) {
        super(props);
        this.onClickFollowers = this.onClickFollowers.bind(this);
        this.onClickFollowing = this.onClickFollowing.bind(this);
    }

    onClickFollowers() {
        const {dispatch} = this.props;
        dispatch(fetchFollowers());
    }

    onClickFollowing() {
        const {dispatch} = this.props;
        dispatch(fetchFollowing());
    }

    render() {
        const selectedUser = this.props.selectedUser;
        return (
            <div className="user-feed-container">
                <Row>
                    <Grid className="user-feed">
                        <Row className="user-feed-row">
                            <Col xs={5} className="user-feed-left-column">
                                <img className="user-feed-profile-image"
                                     src={selectedUser.imgProfile ? selectedUser.imgProfile : defaultProfilePhoto}/>
                                <img className="user-feed-profile-crop"
                                     src={profilePhotoCrop}/>
                            </Col>
                            <Col xs={5} className="user-feed-right-column">
                                <Row className="user-feed-row-1">
                                    <b className="user-feed-username">{selectedUser.username ? selectedUser.username : "username"}</b>
                                </Row>
                                <Row className="user-feed-row-1">
                                    <Button className="user-feed-follow-button" type="button">Follow</Button>
                                </Row>
                                <div onClick={this.onClickFollowers}>
                                    <Row className="user-feed-row-1">
                                        <p className="user-feed-follower-count">{selectedUser.followerCount ? selectedUser.followerCount : "0"} Followers</p>
                                    </Row>
                                </div>
                                <div onClick={this.onClickFollowing}>
                                    <Row className="user-feed-row-1">
                                        <p className="user-feed-following-count">Following {selectedUser.following ? selectedUser.following : "0"}</p>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                    <Divider/>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        followList: state.feed.followList
    }
};

export default connect(mapStateToProps)(RenderUser);

