import { RECEIVE_TAG, } from './actions'

let initialState = {
    tags: {}
}

export const tagsReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_TAG:
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
