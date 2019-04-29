import constants from '../constants/actionTypes'

const initialState = {
    homeFeed: [],
    globalFeed: [],
    searchFeed: [],
    userFeed: [],
    users: [],
    selectedUser: '',
    fileUpload: ''
};

export default (state = initialState, action) => {

    let updated = Object.assign({}, state);

    switch(action.type) {
        case constants.FETCH_HOMEFEED:
            updated['homeFeed'] = action.homeFeed;
            return updated;

        case constants.FETCH_GLOBALFEED:
            updated['globalFeed'] = action.globalFeed;
            return updated;

        case constants.FETCH_USERFEED:
            updated['userFeed'] = action.userFeed;
            return updated;

        case constants.SEARCH_GLOBALFEED:
            updated['searchFeed'] = action.searchFeed;
            return updated;

        case constants.SEARCH_USERS:
            updated['users'] = action.users;
            return updated;

        case constants.UPLOAD_FILE:
            updated['fileUpload'] = action.fileUpload;

        default:
            return state;
    }
}