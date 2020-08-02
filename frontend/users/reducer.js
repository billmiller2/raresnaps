import { REQUEST_USER, RECEIVE_USER  } from './actions'

let initialState = {
    isFetching: false,
    username: ''
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_USER:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_USER:
            return {
                ...state,
                isFetching: false,
                username: action.payload.username
            }
        default:
            return state
    }
}
