// Global feed shows all posts created by any user.
// Search bar at top to locate users or
// posts with specific hashtags.

import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppControls from "./appcontrols";
import {FormControl, FormGroup, Col, Row, Grid} from 'react-bootstrap';
import {fetchGlobalFeed} from '../actions/feedActions';

class GlobalFeed extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.updateDetails = this.updateDetails.bind(this);

        this.state = {
            details: {
                searchType: 0,
                searchStr: ""
            }
        }
    }

    updateDetails(e) {
        let updateDetails = Object.assign({}, this.state.details);
        updateDetails[e.target.id] = e.target.value;
        this.setState({
            details: updateDetails
        });
    }

    handleChange(e) {
        let str = e.target.value;
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchGlobalFeed());
    }

    render() {
        const SearchBar = () => {
            return (
                <Grid className="underline">
                    <Col xs={3}>
                        <FormGroup controlId="searchType">
                            <FormControl className="search-type"
                                         onChange={this.updateDetails}
                                         componentClass="select"
                                         placeholder="#"
                                         value={this.state.details.searchType}>
                                <option value={0}>#</option>
                                <option value={1}>@</option>
                            </FormControl>
                        </FormGroup>
                    </Col>
                    <Col xs={8}>
                        <FormGroup controlId="searchStr">
                            <FormControl className="search-bar"
                                         componentClass="input"
                                         type="text"
                                         onChange={this.updateDetails}
                                         placeholder="Search..."
                                         value={this.state.details.searchStr} />
                        </FormGroup>
                    </Col>
                </Grid>
            );
        };
        return (

            <div>
                <Row>
                    <SearchBar />
                </Row>
                <Row>

                </Row>
                <AppControls />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        globalFeed: state.feed.globalFeed,
        searchFeed: state.feed.searchFeed
    }
};

export default connect(mapStateToProps)(GlobalFeed);