import React from 'react'
import { shallow } from 'enzyme'
import { RandomTagContainer } from './random'

import configureMockStore from 'redux-mock-store'
const mockStore = configureMockStore()

describe('Random tag Container', () => {
    let wrapper, store, tags, tagId

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

        const initialState = {
            tag: {
                selected: tagId,
                tags: tags
            }
        }

        store = mockStore(initialState)

        wrapper = shallow(
            <RandomTagContainer store={store} />
        )
    })

    it('should map state to props', () => {
        expect(wrapper.props().children.props.selected).toEqual(tagId)
        expect(wrapper.props().children.props.tags).toEqual(tags)
    })
})
