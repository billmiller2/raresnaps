import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { REQUEST_PHOTO, RECEIVE_PHOTO } from './photos/actions'
import { REQUEST_USER, RECEIVE_USER  } from './users/actions'

let initialState = {
    user: {
        isFetching: false,
        username: ''
    },
    photo: {
        isFetching: false,
        photo: ''
    }
}

let rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_USER:
            return {
                ...state,
                user: {
                    isFetching: true
                }
            }
        case RECEIVE_USER:
            return {
                ...state,
                user: {
                    isFetching: false,
                    username: action.payload.username
                }
            }
        case REQUEST_PHOTO:
            return {
                ...state,
                photo: {
                    isFetching: true
                }
            }
        case RECEIVE_PHOTO:
            return {
                ...state,
                photo: {
                    isFetching: false,
                    photo: action.payload.photo
                }
            }
        default:
            return state
    }
}

export const store = createStore(rootReducer, applyMiddleware(thunk))
