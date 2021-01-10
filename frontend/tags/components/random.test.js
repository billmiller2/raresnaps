import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { RandomTag } from './random.jsx'
import { Input, LightMauveButton } from '../../common'

const mockStore = configureStore()
const mockOnSubmit = jest.fn((tag, photoId) => Promise.resolve())

jest.mock('react-redux', () => {
    return {
        ...jest.requireActual('react-redux'),
        useDispatch: () => mockOnSubmit
    }
})

const mockRandomTag = jest.fn((tags, selected) => Promise.resolve())

jest.mock('../actions', () => {
    return {
        fetchTags: () => jest.fn(),
        randomTag: () => mockRandomTag
    }
})

describe('Random Tag', () => {
    it('renders a LightMauveButton', () => {
        const store = mockStore({
            tag: {
                tags: {}
            }
        })

        render(
            <Provider store={store}>
                <RandomTag />
            </Provider>
        )

        expect(screen.getByRole('button')).toHaveTextContent('Try a Random Tag')
    })

    it('calls onSubmit when submitted', () => {
        const store = mockStore({
            tag: {
                tags: {}
            }
        })

        const { queryByTestId, queryByText } = render(
            <Provider store={store}>
                <RandomTag />
            </Provider>
        )

        const submit = queryByText('Try a Random Tag')

        fireEvent.click(submit)

        expect(mockOnSubmit).toHaveBeenCalled()
    })
})
