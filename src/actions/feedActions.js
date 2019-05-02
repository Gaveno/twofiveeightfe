import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import {resizeDataURL} from '../actions/helpers';

function globalFeedFetched(feed) {
    return {
        type: actionTypes.FETCH_GLOBALFEED,
        globalFeed: feed
    }
}

function userFeedFetched(user, feed) {
    return {
        type: actionTypes.FETCH_USERFEED,
        userFeed: feed,
        selectedUser: user
    }
}

function homeFeedFetched(feed) {
    return {
        type: actionTypes.FETCH_HOMEFEED,
        homeFeed: feed
    }
}

function uploadFile(file) {
    return {
        type: actionTypes.UPLOAD_FILE,
        fileUpload: file,
        imageResized: false
    }
}

function resizedImage(img) {
    //console.log("img after resize: "+img);
    return {
        type: actionTypes.RESIZE_IMAGE,
        fileUpload: img,
        imageResized: true
    }
}

function fetchedFollowers(users) {
    return {
        type: actionTypes.FETCH_FOLLOWERS,
        followList: users,
        displayType: 1
    }
}

function fetchedFollowing(users) {
    return {
        type: actionTypes.FETCH_FOLLOWING,
        followList: users,
        displayType: 2
    }
}

export function fetchGlobalFeed() {
    const env = runtimeEnv();
    /*return dispatch => {
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
    }*/
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/posts`, {
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
                //console.log(JSON.stringify(res));
                if (!res.post) throw (JSON.stringify(res));
                let feed = [];
                feed.push(res.post);
                dispatch(globalFeedFetched(feed));
            })
            .catch((e) => console.log(e));
    }
}


export function fetchUserFeed() {
    const env = runtimeEnv();
    return dispatch => {
        let user = {
            username: "testUser",
            imgProfile: "",
            //adjust the followerCount later
            followerCount: "",
        };
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
        dispatch(userFeedFetched(user, feed));
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

export function setFileUpload(file) {
    return dispatch => {
        window.location.href = "/#/createpost";
        dispatch(uploadFile(file));
    }
}

export function resizeImage(img) {
    return dispatch => {
        resizeDataURL(img, 258, 258).then((img) => (
            dispatch(resizedImage(img))
        ));
    }
}

export function fetchFollowers() {
    console.log("yay");
    return dispatch => {
        let followers = [];
        for (let i = 0; i < 10; i++) {
            let follower = {
                username: "testFollower",
                imgProfile: ""
            };
            followers.push(follower);
        }
        dispatch(fetchedFollowers(followers));
    };
}

export function fetchFollowing() {
    console.log("yay2");
    return dispatch => {
        let following = [];
        for (let i = 0; i < 10; i++) {
            let followee = {
                username: "testFollowee",
                imgProfile: ""
            };
            following.push(followee);
        }
        dispatch(fetchedFollowing(following));
    };
}
