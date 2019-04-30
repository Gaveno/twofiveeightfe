import {Button, Col, Grid, Row} from "react-bootstrap";
import defaultProfilePhoto from "../images/defaultProfilePhoto.png";
import profilePhotoCrop from "../images/profilePhotoCrop.png";
import React from 'react';
import {Divider} from './divider';
import dummyimage from "../images/dummyimage.jpg";
import btnComment from "../images/btnComment.png";
import btnRepost from "../images/btnRepost.png";

function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
}

export const RenderUser = ({user}) => {
    return (
        <Row>
            <Grid className="user-feed">
                <Row className="user-feed-row">
                        <Col xs={5} className="user-feed-left-column">
                            <img className="user-feed-profile-image"
                             src={user.imgProfile ? user.imgProfile : defaultProfilePhoto}/>
                            <img className="user-feed-profile-crop"
                             src={profilePhotoCrop}/>
                        </Col>
                        <Col xs={5} className="user-feed-right-column">
                            <Row className="user-feed-row-1">
                                <b className="user-feed-username">{user.username ? user.username : "username"}</b>
                            </Row>
                            <Row className="user-feed-row-1">
                                <Button className="user-feed-follow-button" type="button">Follow</Button>
                            </Row>
                            <Row className="user-feed-row-1">
                                <p className="user-feed-follower-count">{user.followerCount ? user.followerCount : "0"} Followers</p>
                            </Row>
                            <Row className="user-feed-row-1">
                                <p className="user-feed-following-count">Following {user.following ? user.following : "0"}</p>
                            </Row>
                            </Col>
                </Row>
            </Grid>
            <Divider/>
        </Row>
    )
};
