import { tagsReducer, initialState } from './reducer'
import * as actions from './actions/creators'

describe('tags reducer', () => {
    it('should return the initial state', () => {
        expect(tagsReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle REQUEST_TAGS', () => {
        expect(tagsReducer(undefined, actions.requestTags())).toEqual({
            error: null,
            isFetching: true,
            selected: [],
            tags: {}
        })
    })

    it('should handle RECEIVE_TAGS and RECEIVE_TAGS', () => {
        const photoId = '32'
        const tagId = '88'

        const tag = {
            tags: {
                [tagId]: {
                    data: '',
                    comments: [],
                    tags: []
                }
            }
        }
        const expectedState = {
            error: null,
            isFetching: false,
            selected: [],
            tags: tag.tags
        }

        expect(tagsReducer(undefined, actions.receiveTag(photoId, tag.tags)))
            .toEqual(expectedState)
        expect(tagsReducer(undefined, actions.receiveTags(tag)))
            .toEqual(expectedState)
    })

    it('should handle SELECT_TAG', () => {
        // don't update state if empty tag is selected
        expect(tagsReducer(undefined, actions.selectTag('')))
            .toEqual(initialState)

        const tagId = 'someId'
        const anotherTagId = 'anotherId'

        const state = {
            ...initialState,
            tags: {
                [tagId]: {
                    tag: 'aaron'
                },
                [anotherTagId]: {
                    tag: 'daniel'
                }
            }
        }

        const expectedState = {
            error: null,
            isFetching: false,
            selected: [tagId],
            tags: state.tags
        }

        expect(tagsReducer(state, actions.selectTag(tagId)))
            .toEqual(expectedState)
    })

    it('should handle REMOVE_SELECTED_TAG', () => {
        const tagId = 'someId'
        const anotherTagId = 'anotherId'

        const state = {
            ...initialState,
            selected: [tagId, anotherTagId],
            tags: {
                [tagId]: {
                    tag: 'aaron'
                },
                [anotherTagId]: {
                    tag: 'daniel'
                }
            }
        }

        const expectedState = {
            error: null,
            isFetching: false,
            selected: [tagId],
            tags: state.tags
        }

        expect(tagsReducer(state, actions.removeSelectedTag(anotherTagId)))
            .toEqual(expectedState)
    })
})
