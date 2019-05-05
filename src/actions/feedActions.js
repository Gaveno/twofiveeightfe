import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import {
    addLinksToUsernames,
    appendFeed,
    arrayBufferToBase64,
    dataURLtoFile,
    getPath,
    insertFeed,
    resizeDataURL
} from '../actions/helpers';
import {getPathUser} from "./helpers";

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
        selectedUser: user,
        displayType: 0
    }
}

function userFeedFetchedNOU(feed) {
    return {
        type: actionTypes.FETCH_USERFEEDNOU,
        userFeed: feed,
        displayType: 0
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

function uploadedProfilePhoto(user) {
    return {
        type: actionTypes.UPDATE_USER,
        selectedUser: user
    }
}

export function fetchGlobalFeed(skip, prevFeed) {
    let s = 0;
    if (skip) s = skip;
    localStorage.setItem('lastFetchGlobal', Date.now());
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/posts/global/?skip=${s}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
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
                if (!res.feed) throw (JSON.stringify(res));
                //console.log("skip: ", s);
                //console.log("Received Feed: ", res.feed);
                let newFeed = [];
                if (s === 0 && prevFeed.length !== 0) {
                    newFeed = insertFeed(prevFeed, res.feed);
                }
                else {
                    newFeed = appendFeed(prevFeed, res.feed);
                }
                //console.log("New Feed: ", newFeed);
                dispatch(globalFeedFetched(newFeed));
            })
            .catch((e) => console.log(e));
    }
}


export function fetchUserFeed(skip, prevFeed) {
    let lastUser = (localStorage.getItem('lastUserFetched') ? localStorage.getItem('lastUserFetched') : "");
    localStorage.setItem('lastUserFetched', getPathUser());
    localStorage.setItem('lastFetchUser', Date.now());
    let changeFeed = !(lastUser === getPathUser());
    //console.log("Getting user feed")
    let s = 0;
    if (skip && !changeFeed) s = skip;
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/posts/user/${getPathUser()}?skip=${s}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
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
                if (!res.feed || !res.user) throw (JSON.stringify(res));
                //console.log("skip: ", s);
                //console.log("Received Feed: ", res.feed);
                //console.log("Got user: ", res.user);
                if (res.user.imgProfile.data && res.user.imgProfile.data.data)
                    res.user.imgProfile.data = arrayBufferToBase64(res.user.imgProfile.data.data);
                //console.log("Got user: ", res.user);
                let newFeed = [];
                if (changeFeed) {
                    newFeed = appendFeed([], res.feed);
                }
                else {
                    if (s === 0 && prevFeed.length !== 0) {
                        newFeed = insertFeed(prevFeed, res.feed);
                    } else {
                        newFeed = appendFeed(prevFeed, res.feed);
                    }
                }
                //console.log("New Feed: ", newFeed);
                return dispatch(userFeedFetched(res.user, newFeed));
            })
            .catch((e) => console.log(e));
    }
}

export function fetchHomeFeed(skip, prevFeed) {
    let s = 0;
    if (skip) s = skip;
    localStorage.setItem('lastFetchHome', Date.now());
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/posts/home/?skip=${s}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
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
                if (!res.feed) throw (JSON.stringify(res));
                //console.log("skip: ", s);
                //console.log("Received Feed: ", res.feed);
                let newFeed = [];
                if (s === 0 && prevFeed.length !== 0) {
                    newFeed = insertFeed(prevFeed, res.feed);
                }
                else {
                    newFeed = appendFeed(prevFeed, res.feed);
                }
                //console.log("New Feed: ", newFeed);
                dispatch(homeFeedFetched(newFeed));
            })
            .catch((e) => console.log(e));
    }
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

export function getPostComments(feed, post) {
    const env = runtimeEnv();
    return dispatch => {
        // Duplicate feed and find index of post
        let newFeed = feed.slice();
        let index = 0;
        for (let i = 0; i < newFeed.length; i++) {
            if (newFeed[i]._id === post._id) {
                index = i;
                newFeed[i].expanded = true;
                break;
            }
        }
        // Fetch comments
        return fetch(`${env.REACT_APP_API_URL}/comments/${post._id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
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
                if (!res.success) throw (JSON.stringify(res));
                newFeed[index] = Object.assign({}, newFeed[index], {comments: res.comments});
                /*console.log("comments retreived: ", res.comments);
                for (let i = 0; i < res.comments.length; i++) {
                    console.log("comment text: ", res.comments[i].text);
                    res.comments[i].text = addLinksToUsernames(res.comments[i].text);
                }*/
                switch (getPath()) {
                    case "globalfeed":
                        return dispatch(globalFeedFetched(newFeed));
                    case "userfeed":
                        return dispatch(userFeedFetchedNOU(newFeed));
                    case "homefeed":
                        return dispatch(homeFeedFetched(newFeed));
                    default:
                        return;
                }
            })
            .catch((e) => console.log(e));
    }
}

export function submitComment(post, text, posts) {
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/comments`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({post_id: post._id, comment: text})
        })
            .then((response) => {
                if (!response.status) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((res) => {
                if (!res.success) throw (JSON.stringify(res));
                console.log("Success: " + res.message);
                dispatch(getPostComments(posts, post));
            })
            .catch((e) => console.log(e));
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
        return dispatch(fetchedFollowers(followers));
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
        return dispatch(fetchedFollowing(following));
    };
}

export function submitProfilePhoto(img, user) {
    return dispatch => {
        resizeDataURL(img, 128, 128).then((img) => {
            console.log("file1: ", img);
            let file = dataURLtoFile('data:image/jpeg;base64,'+img, 'img.jpeg');
            console.log("file2: ", file);
            const env = runtimeEnv();
            let formData = new FormData();
            formData.append('file', file);
            return fetch(`${env.REACT_APP_API_URL}/users/photo`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: formData,
                mode: 'cors'
            })
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
                    return dispatch(uploadedProfilePhoto(user));
                })
                .catch((e) => console.log(e));
        })
    }
}

export function submitAbout(user, about) {
    return dispatch => {
        const env = runtimeEnv();
        return fetch(`${env.REACT_APP_API_URL}/users/about`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: {
                text: about
            } ,
            mode: 'cors'
        })
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
                let updatedUser = Object.assign({}, user, {about: about});
                return dispatch(uploadedProfilePhoto(updatedUser));
            })
            .catch((e) => console.log(e));
    }
}