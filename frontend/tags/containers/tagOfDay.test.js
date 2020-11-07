import React from 'react'
import { shallow } from 'enzyme'
import { TagOfDayContainer } from './tagOfDay'

import configureMockStore from 'redux-mock-store'
const mockStore = configureMockStore()

describe('Tag of Day Container', () => {
    let wrapper, store, tagOfDay

    beforeEach(() => {
        const tagId = '111'

        tagOfDay = {
            name: 'aaron',
            isTagOfDay: true
        }

        const initialState = {
            tag: {
                tags: {
                    [tagId]: tagOfDay,
                    ['anotherId']: {
                        name: 'daniel',
                        isTagOfDay: false
                    }
                }
            }
        }

        store = mockStore(initialState)

        wrapper = shallow(
            <TagOfDayContainer store={store} />
        )
    })

    it('should map state to props', () => {
        expect(wrapper.props().children.props.tagOfDay).toEqual(tagOfDay)

        const noTagOfDayState = {
            tag: {
                tags: {
                    ['anotherId']: {
                        name: 'daniel',
                        isTagOfDay: false
                    }
                }
            }
        }

        store = mockStore(noTagOfDayState)

        wrapper = shallow(
            <TagOfDayContainer store={store} />
        )

        expect(wrapper.props().children.props.tagOfDay).toEqual('')
    })
})
