import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { SearchTag } from './search.jsx'
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
        searchTag: () => jest.fn()
    }
})

describe('Search Tag', () => {
    it('renders a LightMauveButton', () => {
        const store = mockStore({
            tag: {
                tags: {}
            }
        })

        render(
            <Provider store={store}>
                <SearchTag />
            </Provider>
        )

        expect(screen.getByRole('button')).toHaveTextContent('Search Tag')
    })

    it('updates input on change', () => {
        const store = mockStore({
            tag: {
                tags: {}
            }
        })

        const { queryByTestId } = render(
            <Provider store={store}>
                <SearchTag />
            </Provider>
        )

        const input = queryByTestId('searchTagInput')

        fireEvent.change(input, { target: { value: 'aaron my brother' } })

        expect(input.value).toBe('aaron my brother')
    })

    it('calls onSubmit when submitted', () => {
        const store = mockStore({
            tag: {
                tags: {}
            }
        })

        const { queryByTestId, queryByText } = render(
            <Provider store={store}>
                <SearchTag />
            </Provider>
        )

        const submit = queryByText('Search Tag')

        fireEvent.click(submit)

        expect(mockOnSubmit).toHaveBeenCalled()
    })
})
