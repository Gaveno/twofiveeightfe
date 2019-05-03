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
import {getPath} from "./actions/helpers";

//add routing configuration

class App extends Component {
    handleClick() {
        let relativePath = getPath();
        switch (relativePath) {
            case "globalfeed":
                window.scroll({top: 0, left: 0, behavior: 'smooth'});
                break;

            case "userfeed":
                window.scroll({top: 0, left: 0, behavior: 'smooth'});
                break;

            case "homefeed":
                window.scroll({top: 0, left: 0, behavior: 'smooth'});
                break;

            case "createpost":
                console.log("clicked createpost tite");
                break;

            default:
                if (localStorage.getItem("token")) {
                    window.location.href = "/#/homefeed";
                }
        }
    }

    render() {
        const Header = () => {
            return (
                <header className="App-header">
                    <h1>
                        <div className="header-click-area">
                        <img className="App-title-image"
                             src={titleImage}
                             alt="2FIVEEIGHT"
                             onClick={()=>{
                                 this.handleClick();
                             }} />
                        </div>
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
