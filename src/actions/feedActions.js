import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env';

function globalFeedFetched(feed) {
    return {
        type: actionTypes.FETCH_GLOBALFEED,
        globalFeed: feed
    }
}

function userFeedFetched(feed) {
    return {
        type: actionTypes.FETCH_USERFEED,
        userFeed: feed
    }
}

function homeFeedFetched(feed) {
    return {
        type: actionTypes.FETCH_HOMEFEED,
        homeFeed: feed
    }
}

export function fetchGlobalFeed() {
    const env = runtimeEnv();
    return dispatch => {
        let feed = [];
        for (let i = 0; i < 20; i++) {
            let post = {
                image: "",
                username: "globalFeedUser"+i,
                profPhoto: "",
                commentCount: i,
            };
            feed.push(post);
        }
        dispatch(globalFeedFetched(feed));
    }
    /*return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/globalfeed`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'})
            .then((response) => {
                if (!response.status) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((res) => {
                dispatch(globalFeedFetched(res.feed));
            })
            .catch((e) => console.log(e));
    }*/
}


export function fetchUserFeed() {
    const env = runtimeEnv();
    return dispatch => {
        let feed = [];
        for (let i = 0; i < 10; i++) {
            let post = {
                image: "",
                username: "specificUser",
                profPhoto: "",
                commentCount: i,
            };
            feed.push(post);
        }
        dispatch(userFeedFetched(feed));
    }
    /*return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/userfeed`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'})
            .then((response) => {
                if (!response.status) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((res) => {
                dispatch(globalFeedFetched(res.feed));
            })
            .catch((e) => console.log(e));
    }*/
}

export function fetchHomeFeed() {
    const env = runtimeEnv();
    return dispatch => {
        let feed = [];
        for (let i = 0; i < 15; i++) {
            let post = {
                img: "",
                username: "homeUser"+i,
                profPhoto: "",
                commentCount: i,
            };
            feed.push(post);
        }
        dispatch(homeFeedFetched(feed));
    }
    /*return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/userfeed`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'})
            .then((response) => {
                if (!response.status) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((res) => {
                dispatch(globalFeedFetched(res.feed));
            })
            .catch((e) => console.log(e));
    }*/
}