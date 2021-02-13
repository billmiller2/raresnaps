import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { act, screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Tag } from './tag.jsx'
import { ViewTags } from './view.jsx'

const mockStore = configureStore()

jest.mock('react-redux', () => {
    return {
        ...jest.requireActual('react-redux'),
        useDispatch: () => jest.fn()
    }
})

describe('View Tags', () => {
    it('renders a Tag component for each tag in store', () => {
        const photoId = '22'
        const tagId = '23'
        const tag2Id = '223'
        const tag3Id = '253'
        const tagName = 'aaron'
        const tag2Name = 'derrick'
        const tag3Name = 'daniel'

        const store = mockStore({
            tag: {
                tags: {
                    [tagId]: {
                        _id: tagId,
                        name: tagName
                    },
                    [tag2Id]: {
                        _id: tagId,
                        name: tag2Name
                    },
                    [tag3Id]: {
                        _id: tagId,
                        name: tag3Name
                    }
                }
            }
        })

        const { queryByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ViewTags />
                </BrowserRouter>
            </Provider>
        )

        expect(queryByText(tagName)).toBeTruthy()
        expect(queryByText(tag2Name)).toBeTruthy()
        expect(queryByText(tag3Name)).toBeTruthy()
        expect(queryByText('badName')).toBeFalsy()
    })
})

