import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { AddPhoto } from './add.jsx'
import { Input, LightMauveButton } from '../../common'

const mockStore = configureStore()
const mockOnSubmit = jest.fn((tag, photoId) => Promise.resolve())

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

    it('calls onSubmit when submitted', () => {
        const store = mockStore({
            tag: {
                tags: {}
            }
        })

        const { queryByTestId, queryByText } = render(
            <Provider store={store}>
                <AddPhoto />
            </Provider>
        )

        const submit = queryByText('Upload Photo')

        fireEvent.click(submit)

        expect(mockOnSubmit).toHaveBeenCalled()
    })
})
