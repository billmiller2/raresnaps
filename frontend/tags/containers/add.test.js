import React from 'react'
import { shallow } from 'enzyme'
import { AddTagContainer } from './add'

import configureMockStore from 'redux-mock-store'
const mockStore = configureMockStore()

describe('Add tag Container', () => {
    let wrapper, store, tags, tagId, initialState

    beforeEach(() => {
        tagId = '111'

        tags = {
            [tagId]: {
                name: 'aaron',
                isTagOfDay: false
            },
            ['anotherId']: {
                name: 'daniel',
                isTagOfDay: true
            }
        }

        initialState = {
            tag: {
                selected: tagId,
                tags: tags
            }
        }

        store = mockStore(initialState)

        wrapper = shallow(
            <AddTagContainer store={store} />
        )
    })

    it('should map state to props', () => {
        expect(wrapper.props().children.props.tag).toEqual(initialState.tag)
    })
})
