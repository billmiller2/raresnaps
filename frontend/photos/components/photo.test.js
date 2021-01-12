import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { act, screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Photo } from './photo.jsx'

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
        useDispatch: () => mockOnSubmit
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

describe('Photo', () => {
    it('renders an img when photo is passed through props', () => {
        const store = mockStore({
            photo: {
                photos: {}
            }
        })

        const photo = {
            data: 'data'
        }

        const { queryByRole } = render(
            <Provider store={store}>
                <Photo
                    photo={photo}
                    isFetching={false} />
            </Provider>
        )
        
        expect(queryByRole('img')).toBeTruthy()
    })

    it('renders loading when photo is fetching', () => {
        const store = mockStore({
            photo: {
                photos: {}
            }
        })

        const { queryByRole, getByText } = render(
            <Provider store={store}>
                <Photo
                    isFetching={true} />
            </Provider>
        )
        
        expect(queryByRole('img')).toBeFalsy()
        expect(getByText('Loading...')).toBeInTheDocument()
    })

    it('renders not found when photo is not passed', () => {
        const store = mockStore({
            photo: {
                photos: {}
            }
        })

        const { queryByRole, getByText } = render(
            <Provider store={store}>
                <Photo
                    isFetching={false} />
            </Provider>
        )
        
        expect(queryByRole('img')).toBeFalsy()
        expect(getByText('Not Found')).toBeInTheDocument()
    })

    it('calls fetchPhoto if passed', () => {
        const store = mockStore({
            photo: {
                photos: {}
            }
        })
        const fetchPhoto = jest.fn()

        const { queryByRole, getByText } = render(
            <Provider store={store}>
                <Photo
                    fetchPhoto={fetchPhoto}
                    isFetching={false} />
            </Provider>
        )
        
        expect(fetchPhoto).toHaveBeenCalled()
    })

    it('calls fetchComments if passed and photo has comments', () => {
        const store = mockStore({
            photo: {
                photos: {}
            }
        })
        const fetchPhoto = jest.fn()
        const fetchComments = jest.fn()

        const photo = {
            comments: [
                'someId',
                'anotherId'
            ],
            data: 'data'
        }

        const { queryByRole, getByText } = render(
            <Provider store={store}>
                <Photo
                    fetchPhoto={fetchPhoto}
                    fetchComments={fetchComments}
                    photo={photo}
                    isFetching={false} />
            </Provider>
        )
        
        expect(fetchComments).toHaveBeenCalled()
    })

    it('does not call fetchComments if no comments exist on photo', () => {
        const store = mockStore({
            photo: {
                photos: {}
            }
        })
        const fetchPhoto = jest.fn()
        const fetchComments = jest.fn()

        const photo = {
            comments: [],
            data: 'data'
        }

        const { queryByRole, getByText } = render(
            <Provider store={store}>
                <Photo
                    fetchPhoto={fetchPhoto}
                    fetchComments={fetchComments}
                    photo={photo}
                    isFetching={false} />
            </Provider>
        )
        
        expect(fetchComments).not.toHaveBeenCalled()
    })
})
