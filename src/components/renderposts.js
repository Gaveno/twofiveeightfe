import {Col, Grid, Row} from "react-bootstrap";
import dummyimage from "../images/dummyimage.jpg";
import btnRepost from "../images/btnRepost.png";
import btnComment from "../images/btnComment.png";
import defaultProfilePhoto from "../images/defaultProfilePhoto.png";
import profilePhotoCrop from "../images/profilePhotoCrop.png";
import React from 'react';
import {Divider} from './divider';

export const RenderPosts = ({posts}) => {
    return posts.map((post, i) =>
        <Grid key={i} className="post">
            <Col xs={13} sm={8} md={5} className="post-col">
            <Row>
                <img className="post-image" src={post.image ? post.image : dummyimage} alt="A post" />
            </Row>
            <Row className="divider2" />
            <Row>
                <Col xs={6} className="post-footer-rightalign">
                    <img className="post-footer-photo"
                         src={post.profPhoto ? post.profPhoto : defaultProfilePhoto}
                         alt="user profile" />
                    <img className="post-footer-crop"
                         src={profilePhotoCrop}
                         alt="crop overlay" />
                    <b className="post-footer-username">@{post.username ? post.username : "username"}</b>
                </Col>
                    <Col xs={3} className="post-footer-rightalign">
                    <b className="post-footer-commentcount">{post.commentCount ? post.commentCount : "----"}</b>
                    <img className="repost-button"
                         src={btnComment}
                         alt="comment button" />
                    </Col>
                    <Col xs={2} className="post-footer-rightalign">
                    <img className="repost-button"
                         src={btnRepost}
                         alt="repost button" />
                    </Col>
            </Row>
            </Col>
            <Divider />
        </Grid>
    );
};