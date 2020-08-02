import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { RECEIVE_PHOTO } from './photos/actions'
import { RECEIVE_USER, requestUser } from './users/actions'

let initialState = {
    user: {
        username: ''
    },
    photo: ''
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
        case RECEIVE_PHOTO:
            return {
                ...state,
                photo: action.payload.photo
            }
        default:
            return state
    }
}

export const store = createStore(rootReducer, applyMiddleware(thunk))
