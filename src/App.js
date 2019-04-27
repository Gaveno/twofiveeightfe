import React, { Component } from 'react';
import './App.css';
import {HashRouter,Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import titleImage from './images/Title.png';
import Authentication from './components/Authentication/authentication';
import HomeFeed from './components/homefeed';
import GlobalFeed from './components/globalfeed';
import CreatePost from './components/createpost';
import UserFeed from './components/userfeed';
import store from './stores/store';

//add routing configuration

class App extends Component {
    render() {
        const Header = () => {
            return (
                <header className="App-header">
                    <h1>
                        <img className="App-title-image" src={titleImage} alt="2FIVEEIGHT" />
                    </h1>
                </header>
            );
        };
        return (
            <div className="App">
                <Provider store={store}>
                <HashRouter>
                    <div>
                        <Header />
                        <Route exact path="/" render={()=><Authentication />}/>
                        <Route path='/userfeed' render={()=><UserFeed />}/>
                        <Route path='/globalfeed' render={()=><GlobalFeed />}/>
                        <Route path='/createpost' render={()=><CreatePost />}/>
                        <Route path='/homefeed' render={()=><HomeFeed />}/>
                    </div>
                </HashRouter>
                </Provider>
            </div>
        );
    }
}

export default App;
