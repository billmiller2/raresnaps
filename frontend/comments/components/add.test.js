import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { act, screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { AddComment } from './add'
import { Input, LightMauveButton } from '../../common'

const mockStore = configureStore()

describe('Add Comment', () => {
    it('renders a LightMauveButton to add comment', () => {
        const store = mockStore({
            comment: {
                comments: {}
            }
        })

        const { getByRole } = render(
            <Provider store={store}>
                <AddComment />
            </Provider>
        )

        expect(getByRole('button')).toHaveTextContent('Add Comment')
    })

    it('updates the input value on change', () => {
        const store = mockStore({
            comment: {
                comments: {}
            }
        })

        const { getByTestId } = render(
            <Provider store={store}>
                <AddComment />
            </Provider>
        )

        const input = getByTestId('addCommentInput')
        const comment = 'lookin good bud'

        fireEvent.change(input, { target: { value: comment }})

        expect(input.value).toEqual(comment)
    })

    it('calls onSubmit when submitted', async () => {
        const store = mockStore({
            comment: {
                comments: {}
            }
        })

        const mockPromiseResolve = Promise.resolve()
        const mockOnSubmit = jest.fn((comment, photoId) => mockPromiseResolve)

        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <AddComment onSubmit={mockOnSubmit} />
                </BrowserRouter>
            </Provider>
        )

        const submit = getByText('Add Comment')

        fireEvent.click(submit)

        expect(mockOnSubmit).toHaveBeenCalled()

        await act(() => mockPromiseResolve)
    })
})
