import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { usersReducer } from './users'
import { photosReducer } from './photos'

const rootReducer = combineReducers({
    user: usersReducer,
    photo: photosReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
