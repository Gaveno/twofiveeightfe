import React, { Component } from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import axios from "axios/index";

class MovieList extends Component {

    state = {selectedOption: null, movieList: []};

    constructor(props) {
        console.log('CONSTRUCTOR!')
        super(props);
        if (this.props.onTitleChange)
            this.props.onTitleChange(null);

    }
    componentWillMount() {
        console.log('Component WILL MOUNT!')
    }
    componentWillReceiveProps(newProps) {
        console.log('Component WILL RECIEVE PROPS!')
    }
    shouldComponentUpdate(newProps, newState) {
        return true;
    }
    componentWillUpdate(nextProps, nextState) {
        console.log('Component WILL UPDATE!');
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!')
    }
    componentWillUnmount() {
        console.log('Component WILL UNMOUNT!')
    }
    componentDidMount() {
        console.log('Component DID MOUNT!')
        this.handleOnLoadMovies();
    }
    handleOnLoadMovies = () => {
        console.log('LOAD MOVIES');
        var headers={'Authorization':'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYjdmODhkMWUyYTIyMDAwNDE5MzE2MSIsInVzZXJuYW1lIjoiZ2Ftb3JhNTUiLCJpYXQiOjE1NTQ3NzE3NDR9.3p8CwLFxhdq0_3iQ9JskekJfyPk2eVQRNTmh3u2BjgE','Content-Type': 'application/json'};
        axios.get('https://hw5reactmovies.herokuapp.com/movies', {'headers':headers})

            .then((response) => {
                console.log('MOVIES RETURNED - UPDATE STATE');
                //const movieList = response.data.map(movie => movie.title);
                this.setState({
                    movieList: response.data
                });
            })
            .catch((error) => {
                console.log('ERROR')
            })
    }
    handleOnChange = (e) => {
        this.setState({
            selectedOption: e.target.value
        });
        if (this.props.onTitleChange)
            this.props.onTitleChange(e.target.value);
    }

    render() {
        return (
            <div>
                {this.state.movieList.map((movie, index) => (
                    <div key={movie._id} className="row movietitle">
                        <input type="radio" value={movie._id} checked={this.state.selectedOption === movie._id}
                               onChange={(e) => this.handleOnChange(e)}/>
                        <label>{movie.title}</label>
                    </div>
                ))}
                <div>
                    <LinkContainer to="/movie">
                        <button type="button">Add New Movie</button>
                    </LinkContainer>
                </div>
            </div>
        );
    }
}


export default MovieList