import {Button, Col, Grid, Row} from "react-bootstrap";
import defaultProfilePhoto from "../images/defaultProfilePhoto.png";
import profilePhotoCrop from "../images/profilePhotoCrop.png";
import React from 'react';
import {Divider} from './divider';

export const RenderFollowing = ({users}) => {
    return users.map((user, i) =>
        <Grid key={i} className="following">
            <div className="following-container">
                <Row className="following-row">
                    <Col>
                        <p className="following-count">Following {user.following ? user.following : "0"}</p>
                    </Col>
                    <Col>
                        <p className="following-list">{}</p>
                    </Col>
                </Row>
                <Divider/>
            </div>
        </Grid>
    )
};