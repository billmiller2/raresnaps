import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actions from './creators.js'
import * as types from './types.js'
import { COMMENTS } from '../routes'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('creators', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('should create an add comment action', () => {
        const expectedAction = {
            type: types.ADD_COMMENT
        }

        expect(actions.addComment()).toEqual(expectedAction)
    })

    // save comment test
    
    it('should create a recieve comment action', () => {
        const photoId = '123'
        const comments = [
            { id: 'asdf' }
        ]

        const expectedAction = {
            type: types.RECEIVE_COMMENT,
            payload: {
                photoId,
                comments
            }
        }

        expect(actions.receiveComment(photoId, comments)).toEqual(expectedAction)
    })

    it('should create a recieve comments action', () => {
        const comments = { 
            '123': {
                comment: 'looking good bud'
             }
        }

        const expectedAction = {
            type: types.RECEIVE_COMMENTS,
            payload: comments
        }

        expect(actions.receiveComments(comments)).toEqual(expectedAction)
    })

    it('should create a request comments action', () => {
        const expectedAction = {
            type: types.REQUEST_COMMENTS
        }

        expect(actions.requestComments()).toEqual(expectedAction)
    })

    it('creates RECEIVE_COMMENTS after comments have been fetched', () => {
        const commentId = '123'

        const comment = { 
            comment: 'go utes'
        }

        const anotherCommentId = '321'

        const anotherComment = { 
            name: 'utah utes are good'
        }

        const expectedPayload = {
            comments: {
                [commentId]: comment,
                [anotherCommentId]: anotherComment
            }
        }

        fetchMock.getOnce(COMMENTS, {
            body: expectedPayload
        })

        const expectedActions = [
            { type: types.REQUEST_COMMENTS },
            { type: types.RECEIVE_COMMENTS, payload: expectedPayload },
        ]

        const store = mockStore({ comments: {} })

        return store.dispatch(actions.fetchComments()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
