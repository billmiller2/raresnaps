import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actions from './creators.js'
import * as types from './types.js'
import { COMMENTS, POST_COMMENT } from '../routes'
import { UPDATE_COMMENTS } from '../../photos/'

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

    it('saves a new comment', () => {
        const commentId = '123'

        const comment = {
            commentId: commentId,
            comment: 'lookin good aaron'
        }

        const photoId = '232'

        fetchMock.postOnce(POST_COMMENT, {
            body: {
                photoId: photoId,
                comments: {
                    [commentId]: comment
                }
            }
        })

        const store = mockStore({ comments: {} })

        const expectedActions = [
            {
                type: types.RECEIVE_COMMENT,
                payload: {
                    photoId: photoId,
                    comments: {
                        [commentId]: comment
                    }
                }
            },
            {
                type: UPDATE_COMMENTS,
                payload: {
                    photoId: photoId,
                    comments: [commentId]
                }
            }
        ]

        return store.dispatch(actions.saveComment(comment, photoId)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('handles error when saving comment', () => {
        const commentId = '123'

        const comment = {
            commentId: commentId,
            comment: 'looking good daniel'
        }

        const photoId = '232'
        fetchMock.postOnce(POST_COMMENT, 500)

        const store = mockStore({ comments: {} })

        jest.spyOn(window, 'alert').mockImplementation(() => {})

        return store.dispatch(actions.saveComment(comment, photoId)).then(() => {
            expect(store.getActions()).toEqual([])
            expect(window.alert).toBeCalledWith('500 Internal Server Error')
        })
    })

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
