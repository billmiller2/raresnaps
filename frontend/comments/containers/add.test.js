import React from 'react'
import { shallow } from 'enzyme'
import { AddCommentContainer, mapDispatchToProps } from './add'
import * as types from '../actions/types'

import configureMockStore from 'redux-mock-store'
const mockStore = configureMockStore()

describe('Add comment Container', () => {
    let wrapper, store, comments, commentId, initialState

    beforeEach(() => {
        commentId = '111'

        comments = {
            [commentId]: {
                comment: 'looking good aaron'
            },
            ['anotherId']: {
                comment: 'who is that'
            }
        }

        initialState = {
            comment: {
                comments: comments
            }
        }

        store = mockStore(initialState)

        wrapper = shallow(
            <AddCommentContainer store={store} />
        )
    })

    it('should map state to props', () => {
        expect(wrapper.props().children.props.tag).toEqual(initialState.tag)
    })

    it('should map dispatch to props', () => {
        const dispatch = jest.fn()
        const photoId = '555'
        const comment = {
            comment: 'looking good bud'
        }

        mapDispatchToProps(dispatch).onSubmit(comment, photoId)

        expect(dispatch.mock.calls.length).toEqual(1)
    })
})
