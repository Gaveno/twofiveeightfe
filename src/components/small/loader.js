import React, { Component } from 'react';
import ProcessingIcon from "../../images/ProcessingIcon.png";
import {connect} from "react-redux";

class Loader extends Component {
    render() {
        return (
            <div>
                {
                    (this.props.loading===true) ?
                        <img className="loading-icon"
                             src={ProcessingIcon}
                             alt="Loading"/>
                         : ""
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.feed.loading
    }
};

export default connect(mapStateToProps)(Loader);