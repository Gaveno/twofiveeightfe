import {Col, Grid, Row} from "react-bootstrap";
import dummyimage from "../images/dummyimage.jpg";
import btnComment from "../images/btnComment.png";
import defaultProfilePhoto from "../images/defaultProfilePhoto.png";
import profilePhotoCrop from "../images/profilePhotoCrop.png";
import React, {Component} from 'react';
import {Divider} from './divider';
import {connect} from "react-redux";
import {getPostComments, submitComment} from "../actions/feedActions";
import {FormControl, FormGroup, Button, HelpBlock} from "react-bootstrap";
import Username from './username';
import DynamicText from './dynamictext';

//export const RenderPosts = ({posts}) => {
class RenderPosts extends Component {

    constructor(props) {
        super(props);
        this.getComments = this.getComments.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.updateDetails = this.updateDetails.bind(this);
        this.state = {
            details: {
                commentText: ""
            }
        }
    }

    getComments(feed, post) {
        const {dispatch} = this.props;
        dispatch(getPostComments(feed, post));
    }

    handleClick(post) {
        //console.log("post clicked: ", post);
        this.getComments(this.props.posts, post)
    }

    updateDetails(e) {
        let updateDetails = Object.assign({}, this.state.details);
        updateDetails[e.target.id] = e.target.value;
        this.setState({
            details: updateDetails
        });
    }

    getValidationState() {
        const length = this.state.details.commentText.length;
        if (length > 258) return 'error';
        if (length > 240) return 'warning';
        return 'success';
    }

    submitComment(post) {
        const {dispatch} = this.props;
        dispatch(submitComment(post, this.state.details.commentText, this.props.posts));
    }

    render() {
        const length = this.state.details.commentText.length;
        //console.log("posts[0]: ", this.props.posts[0]);
        const RenderComments = ({comments}) => {
            return comments.map((comment, i) =>
                <Grid key={i}>
                    <Username username={comment.username} />: <DynamicText text={comment.text} />
                    <div className="divider2" />
                </Grid>
            )
        };
        return this.props.posts.map((post, i) =>
            <Grid key={i} className="post">
                <Col xs={13} sm={8} md={5} className="post-col">
                    <Row>
                        <img className="post-image"
                             src={post.img ? `data:image/jpeg;base64,${post.img.data}` : dummyimage}
                             onClick={()=>this.handleClick(post)}
                             alt="A post"/>
                    </Row>
                    <Row className="divider2"/>
                    <Row>
                        <Col xs={6} className="post-footer-leftalign">
                            <img className="post-footer-photo"
                                 src={(post.profPhoto && post.profPhoto.data) ?
                                     `data:image/jpeg;base64,${post.profPhoto.data}` :
                                     defaultProfilePhoto}
                                 alt="user profile"/>
                            <img className="post-footer-crop"
                                 src={profilePhotoCrop}
                                 alt="crop overlay"/>
                            <b className="post-footer-username">
                                <Username username={post.username} />
                            </b>
                        </Col>
                        <Col xs={4} className="post-footer-rightalign">
                            <b className="post-footer-commentcount">{post.commentCount ? post.commentCount : "0"}</b>
                            <img className="repost-button"
                                 onClick={()=>this.handleClick(post)}
                                 src={btnComment}
                                 alt="comment button"/>
                        </Col>
                    </Row>
                    <Row className="post-text">
                        <DynamicText text={post.text} />
                    </Row>
                    <Row className="post-comments-start">
                        {post.expanded && post.comments ? <RenderComments comments={post.comments} /> : ""}
                        {post.expanded ?
                            <FormGroup controlId="commentText"
                                       validationState={this.getValidationState()}>
                                <Col xs={6} className="post-center-text">
                                    <FormControl value={this.state.details.text}
                                                 onChange={this.updateDetails}
                                                 componentClass="textarea"
                                                 placeholder="Say something nice..."
                                    />


                                </Col>
                                <Col xs={2} className="post-comment-button-col">
                                    {(this.getValidationState()==='error' ? <Button disabled>Submit</Button> :
                                        <Button onClick={()=>this.submitComment(post)}>Submit</Button>)}
                                    <HelpBlock>{length}/258</HelpBlock>
                                </Col>
                            </FormGroup>

                        : ""}
                    </Row>
                </Col>
                <Divider/>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
};

export default connect(mapStateToProps)(RenderPosts);