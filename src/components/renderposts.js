import {Col, Grid, Row} from "react-bootstrap";
import dummyimage from "../images/dummyimage.png";
import btnRepost from "../images/btnRepost.png";
import btnComment from "../images/btnComment.png";
import React from 'react';
import {Divider} from './divider';

export const RenderPosts = ({posts}) => {
    return posts.map((post, i) =>
        <Grid key={i} className="post">
            <Row>
                <img className="post-image" src={post.image ? post.image : dummyimage} alt="A post" />
            </Row>
            <Row className="divider2" />
            <Row>
                <Col xs={5}>
                    <img className="post-footer-photo"
                         src={post.profPhoto ? post.profPhoto : dummyimage}
                         alt="user profile" />
                    <b>@{post.username ? post.username : "username"}</b>
                </Col>
                <Col xs={5}>
                    <b>{post.commentCount ? post.commentCount : "---"}</b>
                    <img className="repost-button"
                         src={btnRepost}
                         alt="repost button" />
                    <img className="repost-button"
                         src={btnComment}
                         alt="comment button" />

                </Col>
            </Row>
            <Divider />
        </Grid>
    );
};