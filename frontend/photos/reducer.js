import {
    REQUEST_PHOTO,
    RECEIVE_PHOTO,
    REQUEST_PHOTOS,
    RECEIVE_PHOTOS,
} from './actions'

let initialState = {
    isFetching: false,
    since: '',
    photos: {}
}

export const photosReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_PHOTO:
        case REQUEST_PHOTOS:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_PHOTO:
        case RECEIVE_PHOTOS:
            return {
                ...state,
                isFetching: false,
                since: action.payload.since,
                photos: {
                    ...state.photos,
                    ...action.payload.photos
                }
            }
        default:
            return state
    }
}
