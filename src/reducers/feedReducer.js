import constants from '../constants/actionTypes'

const initialState = {
    homeFeed: [],
    globalFeed: [],
    searchFeed: [],
    userFeed: [],
    users: [],
    selectedUser: '',
    fileUpload: '',
    imageResized: false,
    followList: [],
    displayType: 0,
    loading: false
};

export default (state = initialState, action) => {

    let updated = Object.assign({}, state);

    switch(action.type) {
        case constants.FETCH_HOMEFEED:
            updated['homeFeed'] = action.homeFeed;
            updated['loading'] = false;
            return updated;

        case constants.FETCH_GLOBALFEED:
            updated['globalFeed'] = action.globalFeed;
            updated['loading'] = false;
            return updated;

        case constants.FETCH_SEARCHFEED:
            updated['searchFeed'] = action.searchFeed;
            updated['users'] = action.users;
            updated['loading'] = false;
            return updated;

        case constants.FETCH_USERFEED:
            updated['userFeed'] = action.userFeed;
            updated['selectedUser'] = action.selectedUser;
            updated['displayType'] = action.displayType;
            updated['loading'] = false;
            return updated;

        case constants.FETCH_USERFEEDNOU:
            updated['userFeed'] = action.userFeed;
            updated['displayType'] = action.displayType;
            updated['loading'] = false;
            return updated;

        case constants.SEARCH_GLOBALFEED:
            updated['searchFeed'] = action.searchFeed;
            updated['loading'] = false;
            return updated;

        case constants.SEARCH_USERS:
            updated['users'] = action.users;
            updated['loading'] = false;
            return updated;

        case constants.UPLOAD_FILE:
            updated['fileUpload'] = action.fileUpload;
            updated['imageResized'] = action.imageResized;
            updated['loading'] = false;
            return updated;

        case constants.RESIZE_IMAGE:
            updated['fileUpload'] = action.fileUpload;
            updated['imageResized'] = action.imageResized;
            updated['loading'] = false;
            return updated;

        case constants.FETCH_FOLLOWERS:
            updated['followList'] = action.followList;
            updated['displayType'] = action.displayType;
            updated['loading'] = false;
            return updated;

        case constants.FETCH_FOLLOWING:
            console.log("displaytype: ", action.displayType);
            updated['followList'] = action.followList;
            updated['displayType'] = action.displayType;
            updated['loading'] = false;
            return updated;

        case constants.UPDATE_USER:
            updated['selectedUser'] = action.selectedUser;
            return updated;

        case constants.FETCH_USERS:
            updated['users'] = action.users;
            updated['searchFeed'] = action.searchFeed;
            updated['loading'] = false;
            return updated;

        case constants.SET_LOADING:
            updated['loading'] = true;
            return updated;

        default:
            return state;
    }
}