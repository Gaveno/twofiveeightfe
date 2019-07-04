import {connect} from "react-redux";
import React, { Component} from 'react';
import {logoutUser} from "../../actions/authActions";
import btnLogout from "../../images/btnLogout.png";
import {getPath} from "../../actions/helpers";

class Logout extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout(){
        this.props.dispatch(logoutUser());
        window.location.reload();
    }

    render() {
        return (
            <div>
                {
                    (getPath()!=="") ?
                    <img src={btnLogout} alt="logout button"
                            className="button-logout"
                            onClick={()=>this.logout()} />
                    : ""
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        username: state.auth.username,
        error: state.auth.error
    }
};

export default connect(mapStateToProps)(Logout)