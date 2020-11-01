import * as types from './actions/types'

export let initialState = {
    isFetching: false,
    username: ''
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REQUEST_USER:
            return {
                ...state,
                isFetching: true
            }
        case types.RECEIVE_USER:
            return {
                ...state,
                isFetching: false,
                username: action.payload.username
            }
        default:
            return state
    }
}
