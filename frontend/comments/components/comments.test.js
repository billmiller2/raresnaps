import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { act, screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Comments } from './comments'

const mockStore = configureStore()

describe('Comments', () => {
    it("renders a photo's comments", () => {
        const photoId = '123'
        const firstComment = {
            _id: '23',
            comment: 'lookin good bud',
            createdAt: '2020-01-01'
        }

        const secondComment = {
            _id: '43',
            comment: 'here there, bud',
            createdAt: '2020-01-01'
        }

        const store = mockStore({
            comment: {
                comments: {
                    [firstComment._id]: firstComment,
                    [secondComment._id]: secondComment
                }
            },
            photo: {
                photos: {
                    [photoId]: {
                        comments: [
                            firstComment._id,
                            secondComment._id
                        ]
                    }
                }
            }
        })

        const { getByText } = render(
            <Provider store={store}>
                <Comments photoId={photoId} />
            </Provider>
        )

        expect(getByText(firstComment.comment)).toBeInTheDocument()
        expect(getByText(secondComment.comment)).toBeInTheDocument()
    })

    it("does not render comments if photo is not defined in state", () => {
        const photoId = '123'
        const anotherPhotoId = '321'
        const firstComment = {
            _id: '23',
            comment: 'lookin good bud',
            createdAt: '2020-01-01'
        }

        const secondComment = {
            _id: '43',
            comment: 'here there, bud',
            createdAt: '2020-01-01'
        }

        const store = mockStore({
            comment: {
                comments: {
                    [firstComment._id]: firstComment,
                    [secondComment._id]: secondComment
                }
            },
            photo: {
                photos: {
                    [anotherPhotoId]: {
                        comments: [
                            firstComment._id,
                            secondComment._id
                        ]
                    }
                }
            }
        })

        const { queryByText } = render(
            <Provider store={store}>
                <Comments photoId={photoId} />
            </Provider>
        )

        expect(queryByText(firstComment.comment)).not.toBeInTheDocument()
        expect(queryByText(secondComment.comment)).not.toBeInTheDocument()
    })

    it("does not render comments if photo's comments are not defined in state", () => {
        const photoId = '123'
        const firstComment = {
            _id: '23',
            comment: 'lookin good bud',
            createdAt: '2020-01-01'
        }

        const secondComment = {
            _id: '43',
            comment: 'here there, bud',
            createdAt: '2020-01-01'
        }

        const store = mockStore({
            comment: {
                comments: {
                    [firstComment._id]: firstComment,
                    [secondComment._id]: secondComment
                }
            },
            photo: {
                photos: {
                    [photoId]: {}
                }
            }
        })

        const { queryByText } = render(
            <Provider store={store}>
                <Comments photoId={photoId} />
            </Provider>
        )

        expect(queryByText(firstComment.comment)).not.toBeInTheDocument()
        expect(queryByText(secondComment.comment)).not.toBeInTheDocument()
    })

    it("does not render comments if comment is not defined in state", () => {
        const photoId = '123'
        const anotherPhotoId = '321'
        const firstComment = {
            _id: '23',
            comment: 'lookin good bud',
            createdAt: '2020-01-01'
        }

        const secondComment = {
            _id: '43',
            comment: 'here there, bud',
            createdAt: '2020-01-01'
        }

        const store = mockStore({
            comment: {
                comments: {
                    [firstComment._id]: firstComment
                }
            },
            photo: {
                photos: {
                    [photoId]: {
                        comments: [
                            firstComment._id,
                            secondComment._id
                        ]
                    }
                }
            }
        })

        const { queryByText } = render(
            <Provider store={store}>
                <Comments photoId={photoId} />
            </Provider>
        )

        expect(queryByText(secondComment.comment)).not.toBeInTheDocument()
    })
})
