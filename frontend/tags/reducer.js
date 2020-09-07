import { REQUEST_TAGS, RECEIVE_TAG, RECEIVE_TAGS } from './actions'

let initialState = {
    isFetching: false,
    tags: {}
}

export const tagsReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_TAGS:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_TAG:
        case RECEIVE_TAGS:
            return {
                ...state,
                isFetching: false,
                tags: {
                    ...state.tags,
                    ...action.payload.tags
                }
            }
        default:
            return state
    }
}
