import {Button, Col, Grid, Row} from "react-bootstrap";
import defaultProfilePhoto from "../images/defaultProfilePhoto.png";
import profilePhotoCrop from "../images/profilePhotoCrop.png";
import React from 'react';
import {Divider} from './divider';

export const RenderFollowers = ({users}) => {
    return users.map((user, i) =>
        <Grid key={i} className="followers">
            <div className="followers-container">
                <Row className="followers-row">
                    <Col>
                        <p className="followers-count">{user.followerCount ? user.followerCount : "0"} Followers</p>
                    </Col>
                    <Col>
                        <p className="followers-list">{}</p>
                    </Col>
                </Row>
                <Divider/>
            </div>
        </Grid>
    )
};
