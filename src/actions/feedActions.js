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
        if (img) {
            resizeDataURL(img, 258, 258).then((img) => (
                dispatch(resizedImage(img))
            ));
        }
        else {
            dispatch(resizedImage(""));
        }
    }
}

export function submitPost(img, text) {
    const env = runtimeEnv();
    let formData = new FormData();
    console.log("photo to upload: ", img);
    formData.append('file', img);
    formData.append('text', text);
    console.log("token: " + localStorage.getItem('token'));
    return fetch(`${env.REACT_APP_API_URL}/posts`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: formData,
        mode: 'cors'})
        .then((response) => {
            if (!response.status) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((res) => {
            //console.log(JSON.stringify(res));
            console.log(res.message);
            if (!res.success) throw (JSON.stringify(res));
            window.location.href = "/#/homefeed";
        })
        .catch((e) => console.log(e));
}