import * as types from './actions/types'

export let initialState = {
    isFetching: false,
    comments: {}
}

export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REQUEST_COMMENTS:
            return {
                ...state,
                isFetching: true
            }
        case types.RECEIVE_COMMENT:
        case types.RECEIVE_COMMENTS:
            return {
                ...state,
                isFetching: false,
                comments: {
                    ...state.comments,
                    ...action.payload.comments
                }
            }
        default:
            return state
    }
}
