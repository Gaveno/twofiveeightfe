import constants from '../constants/actionTypes';


const initialState = {
    stage: stageType.SELECT,
    grabType: grabType.CAMERA,
    imageUri: null
};

export default (state = initialState, action) => {
    var updated = Object.assign({}, state);

    switch (action.type) {
        case constants.SET_GRAB_TYPE:
            updated['grabType'] = action.grabType;
            return updated;

        case constants.SET_STAGE_SELECT:
            updated['stage'] = action.stage;
            return updated;

        case constants.SET_IMAGE:
            updated['imageUri'] = action.imageUri;
            return updated;
    }
}