import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { RECEIVE_USER } from './root/action/action'
import { requestUser } from './root/action/creator'

let initialState = {
    user: {
        username: ''
    }
}

let rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_USER:
            return {
                ...state,
                user: {
                    username: action.payload.username
                }
            }

        default:
            return state
    }
}

export const store = createStore(rootReducer, applyMiddleware(thunk))
