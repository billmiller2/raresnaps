import React from 'react'
import { shallow } from 'enzyme'
import { AddCommentContainer } from './add'

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
})
