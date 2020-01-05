import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env';

function userLoggedIn(username, isAdmin){
    return {
        type: actionTypes.USER_LOGGEDIN,
        username: username,
        isAdmin: isAdmin
    }
}

function logout(){
    return {
        type: actionTypes.USER_LOGOUT
    }
}

export function updateError(error) {
    return {
        type: actionTypes.UPDATE_ERROR,
        error: error
    }
}

export function submitLogin(data){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: '*cors'})
            .then( (response) => {
                /*if (!response.ok) {
                    dispatch(updateError("Invalid credentials"));
                    throw Error(response.statusText);
                }*/
                return response.json();
            })
            .then( (res) => {
                //console.log("response: ", res);
                if (res.success && res.success === true) {
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('token', res.token);
                    window.location.href = '/#/globalfeed';
                    dispatch(userLoggedIn(data.username, res.isAdmin));
                }
                else {
                    if (res.message)
                        dispatch(updateError(res.message));
                    else
                        dispatch(updateError("An unknown error occurred."));
                }
            })
            .catch( (e) => console.log(e) );
    }
}

export function submitRegister(data){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors'})
            .then( (response) => {
                /*if (!response.ok) {
                    dispatch(updateError(response.statusText));
                    throw Error(response.statusText);
                }*/
                return response.json();
            })
            .then( (res) => {
                if (res.success)
                    dispatch(submitLogin(data));
                else {
                    if (res.message)
                        dispatch(updateError(res.message));
                    else
                        dispatch(updateError("An unknown error occurred."));
                }
            })
            .catch( (e) => console.log(e) );
    }
}

export function logoutUser() {
    return dispatch => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        dispatch(logout());
    }
}