import {
    REQUEST_PHOTO,
    RECEIVE_PHOTO,
    REQUEST_PHOTOS,
    RECEIVE_PHOTOS,
    UPDATE_TAGS,
    UPDATE_COMMENTS
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
        case UPDATE_TAGS:
            const photoId = action.payload.photoId
            const tags = [ ...state.photos[photoId].tags, action.payload.tags ]

            return {
                ...state,
                photos: {
                    ...state.photos,
                    [photoId]: {
                        ...state.photos[photoId],
                        tags: tags
                    }
                }
            }
        case UPDATE_COMMENTS:
            const existing = (typeof state.photos[action.payload.photoId].comments !== 'undefined')
                ? state.photos[action.payload.photoId].comments
                : []

            const comments = [ 
                ...existing,
                action.payload.comments 
            ]

            return {
                ...state,
                photos: {
                    ...state.photos,
                    [action.payload.photoId]: {
                        ...state.photos[action.payload.photoId],
                        comments: comments
                    }
                }
            }
        default:
            return state
    }
}
