import {
    REQUEST_PHOTO,
    RECEIVE_PHOTO,
    REQUEST_PHOTOS,
    RECEIVE_PHOTOS,
} from './actions'

let initialState = {
    isFetching: false,
    photos: []
}

export const photosReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_PHOTO:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_PHOTO:
            return {
                ...state,
                isFetching: false,
                photo: action.payload.photo
            }
        case REQUEST_PHOTOS:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_PHOTOS:
            return {
                ...state,
                isFetching: false,
                photos: action.payload.photos
            }
        default:
            return state
    }
}
