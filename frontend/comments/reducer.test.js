import { commentsReducer, initialState } from './reducer'
import * as actions from './actions/creators'

describe('comments reducer', () => {
    it('should return the initial state', () => {
        expect(commentsReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle REQUEST_COMMENTS', () => {
        expect(commentsReducer(undefined, actions.requestComments())).toEqual({
            comments: {},
            isFetching: true
        })
    })

    it('should handle RECEIVE_COMMENT', () => {
        const photoId = '213'
        const comments = {
            ['123']: {
                comment: 'good work'
            }
        }

        expect(commentsReducer(undefined, actions.receiveComment(photoId, comments))).toEqual({
            comments: comments,
            isFetching: false
        })
    })

    it('should handle RECEIVE_COMMENTS', () => {
        const comments = {
            comments: {
                ['123']: {
                    comment: 'good work'
                },
                ['321']: {
                    comment: 'great work'
                }
            }
        }

        expect(commentsReducer(undefined, actions.receiveComments(comments))).toEqual({
            comments: comments.comments,
            isFetching: false
        })
    })
})

