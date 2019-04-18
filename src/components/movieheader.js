import React, { Component } from 'react';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import axios from "axios/index";

class MovieHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {movie:null};
    }
    componentWillReceiveProps(newProps) {
        //console.log('Component WILL RECIEVE PROPS!')
        if (newProps.movieId != null) {
            if (newProps.movieId) {
                if (newProps.movieId != '') {
                    var headers = {
                        'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYjdmODhkMWUyYTIyMDAwNDE5MzE2MSIsInVzZXJuYW1lIjoiZ2Ftb3JhNTUiLCJpYXQiOjE1NTQ3NzE3NDR9.3p8CwLFxhdq0_3iQ9JskekJfyPk2eVQRNTmh3u2BjgE',
                        'Content-Type': 'application/json'
                    };
                    axios.get('https://hw5reactmovies.herokuapp.com/movies/' + newProps.movieId, {'headers': headers})

                        .then((response) => {
                            this.setState({
                                movie: response.data
                            });
                        })
                        .catch((error) => {
                            console.log('ERROR')
                        })
                }
            }
        }
        else {
            this.setState({
                movie: null
            });
        }
    }
    componentWillMount() {
        console.log('Component WILL MOUNT!')

    }
    render() {
        let title=null;
        if(this.state.movie)
            title= this.state.movie.title;

        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            Movie App
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <LinkContainer to="/movielist">
                            <NavItem eventKey={1}>Movie List</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/movie">
                            <NavItem eventKey={2}>Movie Detail</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar>
                <header className="App-header">
                    <h1 className="App-title">{title}</h1>
                </header>
            </div>

        );
    }
}

export default MovieHeader;