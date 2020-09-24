import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { commentsReducer } from './comments'
import { photosReducer } from './photos'
import { tagsReducer } from './tags'
import { usersReducer } from './users'

const rootReducer = combineReducers({
    comment: commentsReducer,
    photo: photosReducer,
    tag: tagsReducer,
    user: usersReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
