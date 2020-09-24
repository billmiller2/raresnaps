import { REQUEST_COMMENTS, RECEIVE_COMMENT, RECEIVE_COMMENTS } from './actions'

let initialState = {
    isFetching: false,
    comments: {}
}

export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_COMMENTS:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_COMMENT:
        case RECEIVE_COMMENTS:
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
