import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { REQUEST_USER } from './root/action/creator'

let initialState = {
    user: {
        username: ''
    }
}

let rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_USER:
            console.log('get user')
        default:
            return state
    }
}

export const store = createStore(rootReducer, applyMiddleware(thunk))
