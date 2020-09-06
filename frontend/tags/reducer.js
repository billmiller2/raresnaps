import { RECEIVE_TAG, RECEIVE_TAGS } from './actions'

let initialState = {
    tags: {}
}

export const tagsReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_TAG:
        case RECEIVE_TAGS:
            return {
                ...state,
                tags: {
                    ...state.tags,
                    ...action.payload.tags
                }
            }
        default:
            return state
    }
}
