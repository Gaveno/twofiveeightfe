import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env';

function globalFeedFetched(feed) {
    return {
        type: actionTypes.FETCH_GLOBALFEED,
        globalFeed: feed
    }
}
export function fetchGlobalFeed() {
    const env = runtimeEnv();
    return dispatch => {
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
    }
}