import React from 'react'

import { mapStateToProps, mapDispatchToProps } from './photo.jsx'

describe('Add Photo Container', () => {
    it('maps state to props', () => {
        const photo = { id: '123' }
        const state = {
            photo: {
                photos: {
                    '123': photo
                },
                isFetching: false
            }
        }

        const props = {
            photoId: '123'
        }

        expect(mapStateToProps(state, props)).toEqual({
            photo: photo,
            isFetching: state.photo.isFetching
        })
    })

    it('maps dispatch to props', () => {
        const dispatch = jest.fn()

        const photoId = '11'

        mapDispatchToProps(dispatch).fetchPhoto(photoId)

        expect(dispatch.mock.calls.length).toEqual(1)

        mapDispatchToProps(dispatch).fetchComments([])

        expect(dispatch.mock.calls.length).toEqual(2)
    })
})
