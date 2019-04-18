import React, { Component } from 'react';
import './App.css';
import {HashRouter,Route} from 'react-router-dom';
import banner from './Banner2_1.png';

//add routing configuration

class App extends Component {
    state = {movieId: null};

    handleOnTitleChange = (e) => {
        this.setState({
            movieId: e
        });
    }
    render() {
        return (
            <div className="App">
                <HashRouter>
                    <div>
                        <img src={banner} alt="It's coming... 2FIVEEIGHT" />
                    </div>
                </HashRouter>
            </div>
        );
    }
}

export default App;
