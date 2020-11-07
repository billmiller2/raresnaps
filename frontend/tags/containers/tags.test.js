import React from 'react'

import { mapStateToProps, mapDispatchToProps } from './tags.jsx'
import * as types from '../actions/types'

describe('Tags Container', () => {
    it('maps state to props', () => {
        const photoId = '213'

        const props = {
            photoId: photoId
        }

        const tagId = '111'

        const state = {
            photo: {
                photos: {
                    [photoId]: {
                        tags: [tagId]
                    }
                }
            },
            tag: {
                tags: {
                    [tagId]: {
                        name: 'aaron'
                    },
                    ['wrongId']: {
                        name: 'daniel'
                    }
                }
            }
        }

        const expectedTags = state.tag.tags[tagId]

        expect(mapStateToProps(state, props)).toEqual({
            tags: [expectedTags]
        })

        const altProps = {
            photoId: '111'
        }

        // handle when photo is not in state
        expect(mapStateToProps(state, altProps)).toEqual({
            tags: []
        })
    })

    it('maps dispatch to props', () => {
        const dispatch = jest.fn()
        const tagId = '123'

        mapDispatchToProps(dispatch).selectTag(tagId)
        expect(dispatch.mock.calls[0][0]).toEqual({ 
            type: types.SELECT_TAG,
            payload: tagId
        })
    })
})
