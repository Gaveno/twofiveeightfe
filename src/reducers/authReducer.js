import constants from '../constants/actionTypes'

const initialState = {
    loggedIn: localStorage.getItem('token') ? true : false,
    username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
    error: ""
};

export default (state = initialState, action) => {

    var updated = Object.assign({}, state);

    switch(action.type) {
        case constants.USER_LOGGEDIN:
            updated['loggedIn'] = true;
            updated['username'] = action.username;
            updated['error'] = "";
            return updated;

        case constants.USER_LOGOUT:
            updated['loggedIn'] = false;
            updated['username'] = '';
            updated['error'] = "";
            return updated;

        case constants.UPDATE_ERROR:
            updated['error'] = action.error;
            return updated;

        default:
            return state;
    }
}