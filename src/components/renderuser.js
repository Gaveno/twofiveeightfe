import {Button, Col, Grid, Row} from "react-bootstrap";
import defaultProfilePhoto from "../images/defaultProfilePhoto.png";
import profilePhotoCrop from "../images/profilePhotoCrop.png";
import React from 'react';
import {Divider} from './divider';

function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
}

export const RenderUser = ({user}) => {
    return (
        <Grid>
            <div>
                <Row className="user-feed">
                    <Col>
                        <img className="user-feed-profile-image"
                         src={user.imgProfile ? user.imgProfile : defaultProfilePhoto}/>
                        <img className="user-feed-profile-crop"
                         src={profilePhotoCrop}/>
                    </Col>
                    <Col xs={20}>
                        <b className="user-feed-username">{user.username ? user.username : "username"}</b>
                    </Col>
                    <Col xs={20}>
                        <Button className="user-feed-follow-button" type="button">Follow</Button>
                    </Col>
                    <Col xs={20}>
                        <p className="user-feed-follower-count">Followers:{user.followerCount ? user.followerCount : "0"}</p>
                    </Col>
                </Row>
                <Divider/>
            </div>
        </Grid>
    )
};
