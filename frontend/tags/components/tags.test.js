import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { act, screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Tag } from './tag.jsx'
import { Tags } from './tags.jsx'

const mockStore = configureStore()

describe('Tags', () => {
    it('renders a tag component for each tag in props', () => {
        const photoId = '22'
        const tagId = '23'
        const tagName = 'aaron'

        const store = mockStore({
            photo: {
                photos: {
                    [photoId]: {
                        tags: [tagId]
                    }
                }
            },
            tag: {
                tags: {
                    [tagId]: {
                        _id: tagId,
                        name: tagName
                    }
                }
            }
        })

        const { queryByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Tags photoId={photoId} />
                </BrowserRouter>
            </Provider>
        )

        expect(queryByText(tagName)).toBeTruthy()
        expect(queryByText('badName')).toBeFalsy()
    })
})

