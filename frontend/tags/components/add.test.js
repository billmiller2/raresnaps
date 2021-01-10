import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { AddTag } from './add.jsx'
import { Input, LightMauveButton } from '../../common'

const mockStore = configureStore()
const mockOnSubmit = jest.fn((tag, photoId) => Promise.resolve())

jest.mock('react-redux', () => {
    return {
        ...jest.requireActual('react-redux'),
        useDispatch: () => mockOnSubmit
    }
})

jest.mock('../actions', () => {
    return {
        saveTag: (tag, photoId) => jest.fn()
    }
})

describe('Add Tag', () => {
    it('renders a form containing an Input and a LightMauveButton', () => {
        const store = mockStore({
            tag: {
                tags: {}
            }
        })

        render(
            <Provider store={store}>
                <AddTag />
            </Provider>
        )

        expect(screen.getByRole('button')).toHaveTextContent('Add Tag')
    })

    it('updates input on change', () => {
        const store = mockStore({
            tag: {
                tags: {}
            }
        })

        const { queryByTestId } = render(
            <Provider store={store}>
                <AddTag />
            </Provider>
        )

        const input = queryByTestId('tagInput')

        fireEvent.change(input, { target: { value: 'aaron' } })

        expect(input.value).toBe('aaron')
    })

    it('calls onSubmit when submitted', () => {
        const store = mockStore({
            tag: {
                tags: {}
            }
        })

        const { queryByTestId, queryByText } = render(
            <Provider store={store}>
                <AddTag />
            </Provider>
        )

        const submit = queryByText('Add Tag')

        fireEvent.click(submit)

        expect(mockOnSubmit).toHaveBeenCalled()
    })
})
