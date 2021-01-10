import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { act, screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { AddPhoto } from './add.jsx'
import { Input, LightMauveButton } from '../../common'

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

describe('Add Photo', () => {
    it('renders a LightMauveButton to upload photo', () => {
        const store = mockStore({
            tag: {
                tags: {}
            }
        })

        const { queryByTestId } = render(
            <Provider store={store}>
                <AddPhoto />
            </Provider>
        )

        expect(queryByTestId('addPhotoButton')).toHaveTextContent('Upload Photo')
    })

    it('updates the input value when a file is selected', () => {
        const store = mockStore({
            tag: {
                tags: {}
            }
        })

        const { queryByTestId } = render(
            <Provider store={store}>
                <AddPhoto />
            </Provider>
        )

        const input = queryByTestId('fileInput')

        fireEvent.change(input, { target: { files: [ 'testFile' ] }})

        expect(input.files).toEqual(['testFile'])
    })

    it('calls onSubmit when submitted', async () => {
        const store = mockStore({
            tag: {
                tags: {}
            }
        })

        const { queryByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <AddPhoto />
                </BrowserRouter>
            </Provider>
        )

        const submit = queryByText('Upload Photo')

        fireEvent.click(submit)

        expect(mockOnSubmit).toHaveBeenCalled()

        await act(() => mockPromiseResolve)
    })
})
