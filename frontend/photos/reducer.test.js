import { photosReducer, initialState } from './reducer'
import * as actions from './actions/creators'

describe('photos reducer', () => {
    it('should return the initial state', () => {
        expect(photosReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle REQUEST_PHOTO', () => {
        expect(photosReducer(undefined, actions.requestPhoto())).toEqual({
            allFetched: false,
            error: null,
            since: '',
            isFetching: true,
            photos: {}
        })
    })

    it('should handle REQUEST_PHOTOS', () => {
        expect(photosReducer(undefined, actions.requestPhotos())).toEqual({
            allFetched: false,
            error: null,
            since: '',
            isFetching: true,
            photos: {}
        })
    })

    it('should handle RECEIVE_PHOTO', () => {
        const photoId = '32'
        const photo = {
            photos: {
                [photoId]: {
                    data: '',
                    comments: [],
                    tags: []
                }
            }
        }

        const expectedState = {
            allFetched: false,
            error: null,
            isFetching: false,
            since: '',
            photos: photo.photos
        }

        expect(photosReducer(undefined, actions.receivePhoto(photo))).toEqual(expectedState)
    })

    it('should handle RECEIVE_PHOTOS', () => {
        const since = '123'
        const photoId = '32'
        const photo = {
            since: since,
            photos: {
                [photoId]: {
                    data: '',
                    comments: [],
                    tags: []
                }
            }
        }

        const expectedState = {
            allFetched: false,
            error: null,
            isFetching: false,
            since: since,
            photos: photo.photos
        }

        expect(photosReducer(undefined, actions.receivePhotos(photo))).toEqual(expectedState)
    })

    it('should handle UPDATE_TAGS', () => {
        const photoId = '32'
        const tags = ['oneTag', 'anotherTag']

        const errorState = {
            ...initialState,
            error: 'Cannot apply tag. Photo undefined in state'
        }

        // handle when photo is not in state
        expect(photosReducer(undefined, actions.updateTags(photoId, tags))).toEqual(errorState)

        const sampleState = {
            ...initialState,
            photos: {
                ...initialState.photos,
                [photoId]: {
                    tags: []
                }
            }
        }

        const expectedState = {
            allFetched: false,
            error: null,
            isFetching: false,
            since: initialState.since,
            photos: {
                [photoId]: {
                    tags
                }
            }
        }

        expect(photosReducer(sampleState, actions.updateTags(photoId, tags)))
            .toEqual(expectedState)

        const taglessState = {
            ...initialState,
            photos: {
                ...initialState.photos,
                [photoId]: {}
            }
        }

        const expectedTaglessState = {
            allFetched: false,
            error: null,
            isFetching: false,
            since: initialState.since,
            photos: {
                [photoId]: {
                    tags
                }
            }
        }

        expect(photosReducer(taglessState, actions.updateTags(photoId, tags)))
            .toEqual(expectedTaglessState)
    })

    it('should handle UPDATE_COMMENTS', () => {
        const photoId = '32'
        const comments = ['oneComment', 'anotherComment']

        const errorState = {
            ...initialState,
            error: 'Cannot apply comment. Photo undefined in state'
        }

        // handle when photo is not in state
        expect(photosReducer(undefined, actions.updateComments(photoId, comments)))
            .toEqual(errorState)

        const sampleState = {
            ...initialState,
            photos: {
                ...initialState.photos,
                [photoId]: {
                    comments: []
                }
            }
        }

        const expectedState = {
            allFetched: false,
            error: null,
            isFetching: false,
            since: initialState.since,
            photos: {
                [photoId]: {
                    comments: [
                        comments
                    ]
                }
            }
        }

        expect(photosReducer(sampleState, actions.updateComments(photoId, comments)))
            .toEqual(expectedState)

        const commentlessState = {
            ...initialState,
            photos: {
                ...initialState.photos,
                [photoId]: {}
            }
        }

        const expectedCommentlessState = {
            allFetched: false,
            error: null,
            isFetching: false,
            since: initialState.since,
            photos: {
                [photoId]: {
                    comments: [
                        comments
                    ]
                }
            }
        }

        expect(photosReducer(commentlessState, actions.updateComments(photoId, comments)))
            .toEqual(expectedCommentlessState)
    })
})
