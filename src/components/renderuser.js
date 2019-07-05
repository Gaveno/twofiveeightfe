import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Button, Col, FormControl, FormGroup, HelpBlock, NavItem, Row} from "react-bootstrap";
import defaultProfilePhoto from "../images/defaultProfilePhoto.png";
import profilePhotoCrop from "../images/profilePhotoCrop.png";
import {
    fetchFollowers,
    submitFollow,
    submitProfilePhoto,
    submitUnfollow,
} from "../actions/feedActions";
import {fetchFollowing} from "../actions/feedActions";
import {submitAbout} from "../actions/feedActions";
import btnEdit from "../images/btnEdit.png";
import {getOrientation, getPathUser, resetOrientation} from "../actions/helpers";
import {Spacer} from "./small/spacer";

function fileToBase64(file) {
    console.log("file to convert: ",file[0]);
    return new Promise((res, rej) => {
        const r = new FileReader();
        r.readAsDataURL(file[0]);
        r.onload = () => {
            return res(r.result);
        };
        r.onerror = error => rej(error);
    });
}

class RenderUser extends Component {
    constructor(props) {
        super(props);
        this.inputCaptureRef = React.createRef();
        this.openPhotoSelect = this.openPhotoSelect.bind(this);
        this.onPhotoCapture = this.onPhotoCapture.bind(this);
        this.onClickFollowers = this.onClickFollowers.bind(this);
        this.onClickFollowing = this.onClickFollowing.bind(this);
        this.onClickUpdateProfilePhoto = this.onClickUpdateProfilePhoto.bind(this);
        this.onClickUpdateAbout = this.onClickUpdateAbout.bind(this);
        this.updateAbout = this.updateAbout.bind(this);
        this.onClickFollow = this.onClickFollow.bind(this);
        this.state = {
            aboutText: "",
            editAbout: false
        }
    }

    onClickFollowers() {
        const {dispatch} = this.props;
        dispatch(fetchFollowers());
    }

    onClickFollowing() {
        const {dispatch} = this.props;
        dispatch(fetchFollowing());
    }

    onClickUpdateProfilePhoto() {
        const {dispatch} = this.props;
        dispatch(submitProfilePhoto());
    }

    onClickUpdateAbout() {
        const {dispatch} = this.props;
        dispatch(submitAbout(this.props.selectedUser, this.state.aboutText));
        this.setState({editAbout: false});
    }

    openPhotoSelect() {
        this.inputCaptureRef.current.click();
    }

    onPhotoCapture(file) {
        if (file && file[0]) {
            let orientation = 0;
            getOrientation(file[0], (ori) => {
                orientation = ori;
                fileToBase64(file).then(
                    data => {
                        if (data) {
                            // dispatch
                            resetOrientation(data, orientation, (rotated) => {
                                const {dispatch} = this.props;
                                dispatch(submitProfilePhoto(rotated, this.props.selectedUser));
                            })
                        }
                    }
                )
            })
        }
    }

    updateAbout(e) {
        this.setState({aboutText: e.target.value});
    }

    getValidationState() {
        const length = (this.state.aboutText) ? this.state.aboutText.length : 0;
        if (length > 258) return 'error';
        if (length > 240) return 'warning';
        return 'success';
    }

    onClickFollow() {
        const {dispatch} = this.props;
        if (this.props.selectedUser.following)
            dispatch(submitUnfollow(this.props.userFeed));
        else
            dispatch(submitFollow(this.props.userFeed));
    }

    onClickEditAbout = () => {
        this.setState({aboutText: this.props.selectedUser.about, editAbout: true});
    };

    render() {
        return (
            <div className="user-feed-container">
                <FormGroup controlId="file">
                    <input type="file"
                           className="hide"
                           accept="image/*"
                           id="photoUpload"
                           ref={this.inputCaptureRef}
                           onChange={ (e) => this.onPhotoCapture(e.target.files) }
                    />
                </FormGroup>
                <Row>
                    <div className="user-feed">
                        <Row className="user-feed-row">
                            <Col className="user-feed-left-column">
                                <img className="user-feed-profile-image"
                                     alt="user profile"
                                     src={(this.props.selectedUser.imgProfile && this.props.selectedUser.imgProfile.data)
                                         ? `data:image/jpeg;base64,${this.props.selectedUser.imgProfile.data}`
                                         : defaultProfilePhoto}/>
                                <img className="user-feed-profile-crop"
                                     alt="profile crop"
                                     src={profilePhotoCrop}/>
                                <NavItem eventKey={3} className="no-bullets">
                                    {
                                        (getPathUser() ===  localStorage.getItem("username") )?
                                            <div onClick={this.openPhotoSelect}>
                                                <img className="edit-profile-photo"
                                                     alt="profile edit"
                                                     src={btnEdit} onClick={this.onClickUpdateProfilePhoto}/>
                                            </div>
                                            : ""
                                    }
                                </NavItem>
                            </Col>
                            <Col className="user-feed-right-column">
                                <Row className="user-feed-row-1">
                                    <b className="user-feed-username">{this.props.selectedUser.username
                                        ? this.props.selectedUser.username
                                        : "usernotfound"}</b>
                                </Row>
                                {
                                    getPathUser() !== localStorage.getItem("username") ?
                                        <Row className="user-feed-row-1">
                                            <Button className="user-feed-follow-button" type="button"
                                                    onClick={this.onClickFollow}>
                                                {
                                                    this.props.selectedUser.following ? "Unfollow" : "Follow"
                                                }
                                            </Button>
                                        </Row>
                                        :
                                        ""
                                }
                                <div onClick={this.onClickFollowers}>
                                    <Row className="user-feed-row-1">
                                        <NavItem className="no-bullets">
                                            <p className="user-feed-follower-count">{this.props.selectedUser.followersCount
                                                ? this.props.selectedUser.followersCount
                                                : "0"} Followers</p>
                                        </NavItem>
                                    </Row>
                                </div>
                                <div onClick={this.onClickFollowing}>
                                    <Row className="user-feed-row-1">
                                        <NavItem className="no-bullets">
                                            <p className="user-feed-following-count">Following {this.props.selectedUser.followingCount
                                                ? this.props.selectedUser.followingCount
                                                : "0"}</p>
                                        </NavItem>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Spacer/>
                    {
                        (getPathUser() ===  localStorage.getItem("username") && this.state.editAbout) ?
                            <Row className="about-textbox">
                                <FormGroup controlId="aboutText"
                                           validationState={this.getValidationState()}>
                                    <Col xs={6}>
                                        <FormControl value={this.state.aboutText}
                                                     onChange={this.updateAbout}
                                                     componentClass="textarea"
                                                     placeholder="Tell us about yourself..."/>
                                    </Col>
                                    <Col xs={2} className="submit-about-button-col">
                                        {(this.getValidationState()==='error' ? <Button disabled>Update</Button> :
                                            <Button onClick={()=>this.onClickUpdateAbout()}>Update</Button>)}
                                        <HelpBlock>
                                            {(this.state.aboutText) ? this.state.aboutText.length : 0}/258
                                        </HelpBlock>
                                    </Col>
                                </FormGroup>
                            </Row>
                            :
                            <div>
                                <div>
                                    {getPathUser()===localStorage.getItem('username') ?
                                        <img className="edit-about-text"
                                             alt="profile edit"
                                             src={btnEdit} onClick={this.onClickEditAbout}/>
                                    : ""}
                                    <b>About</b>
                                </div>
                                <div className="about-text">
                                    {this.props.selectedUser.about}
                                </div>
                            </div>

                    }
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        followList: state.feed.followList,
        displayType: state.feed.displayType,
        fileUpload: state.feed.fileUpload,
        selectedUser: state.feed.selectedUser,
        userFeed: state.feed.userFeed
    }
};

export default connect(mapStateToProps)(RenderUser);

