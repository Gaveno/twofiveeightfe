// Footer for the app with navigation controls
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {NavItem, Nav, FormGroup} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import btnUserFeed from '../images/btnUserFeed.png';
import btnGlobalFeed from '../images/btnGlobalFeed.png';
import btnCreatePost from '../images/btnCreatePost.png';
import btnHomeFeed from '../images/btnHomeFeed.png';
import btnUserFeedSel from '../images/btnUserFeedSel.png';
import btnGlobalFeedSel from '../images/btnGlobalFeedSel.png';
import btnCreatePostSel from '../images/btnCreatePostSel.png';
import btnHomeFeedSel from '../images/btnHomeFeedSel.png';
import {setFileUpload, setLoading} from '../actions/feedActions';
import {fileToBase64, getOrientation, getPath, getPathUser, resetOrientation, smoothScroll} from "../actions/helpers";

class AppControls extends Component {
    constructor(props) {
        super(props);
        this.inputCaptureRef = React.createRef();
        this.openPhotoSelect = this.openPhotoSelect.bind(this);
        this.onPhotoCapture = this.onPhotoCapture.bind(this);
        this.onIconClick = this.onIconClick.bind(this);
    }

    openPhotoSelect() {
        this.inputCaptureRef.current.click();
    }

    onPhotoCapture(file) {
        if (file && file[0]) {
            const {dispatch} = this.props;
            dispatch(setLoading());
            let orientation = 0;
            getOrientation(file[0], (ori) => {
                orientation = ori;
                fileToBase64(file).then(
                    data => {
                        if (data) {
                            // dispatch
                            resetOrientation(data, orientation, (rotated) => {
                                const {dispatch} = this.props;
                                dispatch(setFileUpload(rotated));
                            })
                        }
                    }
                )
            })
        }
    }

    componentDidMount() {
        document.body.style.zoom = "90%";
    }

    onIconClick(pathlink) {
        if (getPath() === pathlink) {
            smoothScroll(0);
            setTimeout(() => {
                if (getPath() === "userfeed" && this.props.selectedUser.username !== getPathUser()) {
                    window.location.reload();
                }
            }, 10);
        }
    }

    render() {
        return (
            <div>
                <FormGroup controlId="file">
                    <input type="file"
                           className="hide"
                           accept="image/*"
                           id="photoUpload"
                           ref={this.inputCaptureRef}
                           onChange={ (e) => this.onPhotoCapture(e.target.files) }
                    />
                </FormGroup>
                <Nav bsStyle="tabs" className="App-footer">
                    <LinkContainer to={"/userfeed/"+localStorage.getItem("username")}>
                        <NavItem eventKey={1} className="App-footer-navitem" onClick={()=>this.onIconClick("userfeed")}>
                            <img className="App-footer-image" src={
                                getPath()==="userfeed" ? btnUserFeedSel : btnUserFeed
                            } alt="User Feed" />
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/globalfeed">
                        <NavItem eventKey={2} className="App-footer-navitem" onClick={()=>this.onIconClick("globalfeed")}>
                            <img className="App-footer-image" src={
                                getPath()==="globalfeed" ? btnGlobalFeedSel : btnGlobalFeed
                            } alt="Global Feed" />
                        </NavItem>
                    </LinkContainer>
                    {/*<LinkContainer to="/createpost">*/}
                        <NavItem eventKey={3} className="App-footer-navitem">
                            <div onClick={this.openPhotoSelect}>
                                <img className="App-footer-image" src={
                                    getPath()==="createpost" ? btnCreatePostSel : btnCreatePost
                                } alt="Create a post" />
                            </div>
                        </NavItem>
                    {/*</LinkContainer>*/}
                    <LinkContainer to="/homefeed">
                        <NavItem eventKey={4} className="App-footer-navitem" onClick={()=>this.onIconClick("homefeed")}>
                            <img className="App-footer-image" src={
                                getPath()==="homefeed" ? btnHomeFeedSel : btnHomeFeed
                            } alt="Home feed" />
                        </NavItem>
                    </LinkContainer>
                </Nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedUser: state.feed.selectedUser
    }
};

export default connect(mapStateToProps)(AppControls);