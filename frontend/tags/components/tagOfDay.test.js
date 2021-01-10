import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { TagOfDay } from './tagOfDay.jsx'
import { Input, LightMauveButton } from '../../common'

const mockStore = configureStore()
const mockOnSubmit = jest.fn((tag, photoId) => Promise.resolve())
const mockSelectTag = jest.fn((tag, photoId) => Promise.resolve())

jest.mock('react-redux', () => {
    return {
        ...jest.requireActual('react-redux'),
        useDispatch: () => mockOnSubmit
    }
})

const mockRandomTag = jest.fn((tags, selected) => Promise.resolve())

jest.mock('../', () => {
    return {
        selectTag: () => mockSelectTag
    }
})

describe('Tag of Day', () => {
    it('renders a LightMauveButton with the tag of the day', () => {
        const store = mockStore({
            tag: {
                tags: {
                    someId: {
                        isTagOfDay: true,
                        name: 'aaron'
                    },
                    anotherId: {
                        isTagOfDay: false,
                        name: 'chad'
                    }
                }
            }
        })

        render(
            <Provider store={store}>
                <TagOfDay />
            </Provider>
        )

        expect(screen.getByRole('button')).toHaveTextContent('The Tag of the Day is aaron')
    })

    it('calls onSubmit when submitted', () => {
        const store = mockStore({
            tag: {
                tags: {
                    someId: {
                        isTagOfDay: true,
                        name: 'aaron'
                    },
                    anotherId: {
                        isTagOfDay: false,
                        name: 'chad'
                    }
                }
            }
        })

        const { queryByTestId, queryByText } = render(
            <Provider store={store}>
                <TagOfDay />
            </Provider>
        )

        const submit = queryByText('The Tag of the Day is aaron')

        fireEvent.click(submit)

        expect(mockOnSubmit).toHaveBeenCalled()
    })
})
