import React from 'react'
import { shallow } from 'enzyme'
import { PhotosContainer } from './photos'

import configureMockStore from 'redux-mock-store'
const mockStore = configureMockStore()

describe('Photos Container', () => {
    let wrapper, store, tagOfDay, since, selectedTags

    beforeEach(() => {
        const tagId = '111'

        tagOfDay = {
            name: 'aaron',
            isTagOfDay: true
        }

        since = '2010'
        selectedTags = [tagId]

        const initialState = {
            photo: {
                since: since
            },
            tag: {
                selected: selectedTags,
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
            <PhotosContainer store={store} />
        )
    })

    it('should map state to props', () => {
        const expectedProps = {
            since: since,
            selectedTags: selectedTags,
            tags: [tagOfDay]
        }

        expect(wrapper.props().children.props).toMatchObject(expectedProps)
    })
})
