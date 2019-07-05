import React, { Component } from 'react';
import ProcessingIcon from "../../images/ProcessingIcon.png";
import {connect} from "react-redux";

class Loader extends Component {
    render() {
        if (this.props.loading===true) {
            return (
                <div>
                    <div className="loading-container" />
                    <img className="loading-icon"
                         src={ProcessingIcon}
                         alt="Loading"/>

                </div>
            );
        }
        else {
            return "";
        }
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.feed.loading
    }
};

export default connect(mapStateToProps)(Loader);