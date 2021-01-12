import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { act, screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Photos } from './photos.jsx'

const mockStore = configureStore()
const mockPromiseResolve = Promise.resolve({
    payload: {
        photos: {
            someId: {
                data: 'data'
            }
        }
    }
})
const mockOnSubmit = jest.fn((tag, photoId) => mockPromiseResolve)

jest.mock('react-redux', () => {
    return {
        ...jest.requireActual('react-redux'),
        useDispatch: () => mockOnSubmit,
        useSelector: () => jest.fn()
    }
})

jest.mock('../', () => {
    return {
        uploadPhoto: () => jest.fn()
    }
})

jest.mock('react-router-dom', () => {
    return {
        ...jest.requireActual('react-router-dom'),
        useParams: () => 'testPhotoId'
    }
})

describe('Photos', () => {
    it('renders the search tag button', () => {
        const store = mockStore({
            photo: {
                photos: {}
            }
        })

        const photos = {
            someId: {
                comments: [],
                data: 'data'
            },
            anotherId: {
                comments: [],
                data: 'moredata'
            },
        }

        const fetchPhotos = jest.fn()

        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Photos
                        fetchPhotos={fetchPhotos}
                        photos={photos}
                        selectedTags={[]}
                        tags={[]}
                        isFetching={false} />
                </BrowserRouter>
            </Provider>
        )
        
        expect(getByText('Search Tag')).toBeInTheDocument()
    })
})
