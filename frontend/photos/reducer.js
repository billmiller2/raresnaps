import * as types from './actions/types'

export let initialState = {
    isFetching: false,
    since: '',
    photos: {}
}

export const photosReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REQUEST_PHOTO:
        case types.REQUEST_PHOTOS:
            return {
                ...state,
                isFetching: true
            }
        case types.RECEIVE_PHOTO:
        case types.RECEIVE_PHOTOS:
            return {
                ...state,
                isFetching: false,
                since: action.payload.since,
                photos: {
                    ...state.photos,
                    ...action.payload.photos
                }
            }
        case types.UPDATE_TAGS:
            const photoId = action.payload.photoId
            
            if (typeof state.photos[photoId] === 'undefined') {
                return state
            }

            const existingTags = typeof state.photos[photoId].tags !== 'undefined'
                ? state.photos[photoId].tags
                : []

            const tags = [ 
                ...existingTags, 
                action.payload.tags
            ]

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
        case types.UPDATE_COMMENTS:
            if (typeof state.photos[action.payload.photoId] === 'undefined') {
                return state
            }
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
