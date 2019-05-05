import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Button, Col, FormControl, FormGroup, Grid, HelpBlock, NavItem, Row} from "react-bootstrap";
import defaultProfilePhoto from "../images/defaultProfilePhoto.png";
import profilePhotoCrop from "../images/profilePhotoCrop.png";
import {Divider} from './divider';
import {fetchFollowers, submitProfilePhoto} from "../actions/feedActions";
import {fetchFollowing} from "../actions/feedActions";
import {submitAbout} from "../actions/feedActions";
import btnEdit from "../images/btnEdit.png";
import {arrayBufferToBase64, getOrientation, getPath, getPathUser, resetOrientation} from "../actions/helpers";

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
        this.updateDetails = this.updateDetails.bind(this);
        this.state = {
            details: {
                aboutText: ""
            }
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
        dispatch(submitAbout(this.props.selectedUser, this.state.details.aboutText));
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
                                dispatch(submitProfilePhoto(data, this.props.selectedUser));
                            })
                        }
                    }
                )
            })
        }
    }

    updateDetails(e) {
        let updateDetails = Object.assign({}, this.state.details);
        updateDetails[e.target.id] = e.target.value;
        this.setState({
            details: updateDetails
        });
    }

    getValidationState() {
        const length = this.state.details.aboutText.length;
        if (length > 258) return 'error';
        if (length > 240) return 'warning';
        return 'success';
    }

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
                    <Grid className="user-feed">
                        <Row className="user-feed-row">
                            <Col xs={5} className="user-feed-left-column">
                                <img className="user-feed-profile-image"
                                     alt="user profile"
                                     src={(this.props.selectedUser.imgProfile && this.props.selectedUser.imgProfile.data)
                                         ? `data:image/jpeg;base64,${this.props.selectedUser.imgProfile.data}`
                                         : defaultProfilePhoto}/>
                                <img className="user-feed-profile-crop"
                                     alt="profile crop"
                                     src={profilePhotoCrop}/>
                                <NavItem eventKey={3} className="no-bullets">
                                    <div onClick={this.openPhotoSelect}>
                                        <img className="edit-profile-photo"
                                             alt="profile edit"
                                             src={btnEdit} onClick={this.onClickUpdateProfilePhoto}/>
                                    </div>
                                </NavItem>
                            </Col>
                            <Col xs={5} className="user-feed-right-column">
                                <Row className="user-feed-row-1">
                                    <b className="user-feed-username">{this.props.selectedUser.username
                                        ? this.props.selectedUser.username
                                        : "username"}</b>
                                </Row>
                                {
                                    getPathUser() !== localStorage.getItem("username") ?
                                        <Row className="user-feed-row-1">
                                            <Button className="user-feed-follow-button" type="button">Follow</Button>
                                        </Row>
                                        :
                                        ""
                                }
                                <div onClick={this.onClickFollowers}>
                                    <Row className="user-feed-row-1">
                                        <NavItem className="no-bullets">
                                            <p className="user-feed-follower-count">{this.props.selectedUser.followerCount
                                                ? this.props.selectedUser.followerCount
                                                : "0"} Followers</p>
                                        </NavItem>
                                    </Row>
                                </div>
                                <div onClick={this.onClickFollowing}>
                                    <Row className="user-feed-row-1">
                                        <NavItem className="no-bullets">
                                            <p className="user-feed-following-count">Following {this.props.selectedUser.following
                                                ? this.props.selectedUser.following
                                                : "0"}</p>
                                        </NavItem>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                    <Divider/>
                    {
                        getPathUser() ===  localStorage.getItem("username") ?
                            <Row className="about-text">
                                <FormGroup controlId="aboutText"
                                           validationState={this.getValidationState()}>
                                    <Col xs={6}>
                                        <FormControl value={this.state.details.aboutText}
                                                     onChange={this.updateDetails}
                                                     componentClass="textarea"
                                                     placeholder="Say something nice..."/>
                                    </Col>
                                    <Col xs={2} className="submit-about-button-col">
                                        {(this.getValidationState()==='error' ? <Button disabled>Submit</Button> :
                                            <Button onClick={()=>this.onClickUpdateAbout()}>Update</Button>)}
                                        <HelpBlock>{this.state.details.aboutText.length}/258</HelpBlock>
                                    </Col>
                                </FormGroup>
                            </Row>
                            :
                            <div>
                                <div>
                                <b>About</b>
                                </div>
                                {this.props.selectedUser.about}
                            </div>


                    }
                </Row>
                <Divider/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        followList: state.feed.followList,
        displayType: state.feed.displayType,
        fileUpload: state.feed.fileUpload,
        selectedUser: state.feed.selectedUser
    }
};

export default connect(mapStateToProps)(RenderUser);

