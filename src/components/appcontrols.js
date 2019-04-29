// Footer for the app with navigation controls
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {NavItem, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import btnUserFeed from '../images/btnUserFeed.png';
import btnGlobalFeed from '../images/btnGlobalFeed.png';
import btnCreatePost from '../images/btnCreatePost.png';
import btnHomeFeed from '../images/btnHomeFeed.png';

class AppControls extends Component {
    constructor(props) {
        super(props)
        this.inputCaptureRef = React.createRef();
        this.openPhotoSelect = this.openPhotoSelect.bind(this);
    }

    openPhotoSelect() {
        this.inputCaptureRef.current.click();
    }

    render() {
        return (
            <Nav bsStyle="tabs" className="App-footer">
                <input type="file"
                       className="hide"
                       accept="image/*"
                       capture="user"
                       ref={this.inputCaptureRef} />
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
};

export default connect(mapStateToProps)(AppControls);