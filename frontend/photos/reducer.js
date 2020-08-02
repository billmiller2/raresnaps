import { REQUEST_PHOTO, RECEIVE_PHOTO } from './actions'

let initialState = {
    isFetching: false,
    photo: ''
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
        default:
            return state
    }
}
