// Footer for the app with navigation controls
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {NavItem, Nav, FormGroup} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import btnUserFeed from '../images/btnUserFeed.png';
import btnGlobalFeed from '../images/btnGlobalFeed.png';
import btnCreatePost from '../images/btnCreatePost.png';
import btnHomeFeed from '../images/btnHomeFeed.png';
import {setFileUpload} from '../actions/feedActions';
import {getOrientation, resetOrientation} from "../actions/helpers";

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

class AppControls extends Component {
    constructor(props) {
        super(props);
        this.inputCaptureRef = React.createRef();
        this.openPhotoSelect = this.openPhotoSelect.bind(this);
        this.onPhotoCapture = this.onPhotoCapture.bind(this);
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
                    <LinkContainer to="/userfeed">
                        <NavItem eventKey={1} className="App-footer-navitem">
                            <img className="App-footer-image" src={btnUserFeed} alt="User Feed" />
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/globalfeed">
                        <NavItem eventKey={2} className="App-footer-navitem">
                            <img className="App-footer-image" src={btnGlobalFeed} alt="Global Feed" />
                        </NavItem>
                    </LinkContainer>
                    {/*<LinkContainer to="/createpost">*/}
                        <NavItem eventKey={3} className="App-footer-navitem">
                            <div onClick={this.openPhotoSelect}>
                                <img className="App-footer-image" src={btnCreatePost} alt="Create a post" />
                            </div>
                        </NavItem>
                    {/*</LinkContainer>*/}
                    <LinkContainer to="/homefeed">
                        <NavItem eventKey={4} className="App-footer-navitem">
                            <img className="App-footer-image" src={btnHomeFeed} alt="Home feed" />
                        </NavItem>
                    </LinkContainer>
                </Nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
};

export default connect(mapStateToProps)(AppControls);