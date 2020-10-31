import * as actions from './creators.js'
import * as types from './types.js'

describe('creators', () => {
    it('should create an request photos action', () => {
        const expectedAction = {
            type: types.REQUEST_PHOTOS
        }

        expect(actions.requestPhotos()).toEqual(expectedAction)
    })

    it('should create a receive photos action', () => {
        const photos = [
            { id: '123' },
            { id: '321' }
        ]
        const expectedAction = {
            type: types.RECEIVE_PHOTOS,
            payload: photos
        }

        expect(actions.receivePhotos(photos)).toEqual(expectedAction)
    })

    it('should create an update tags action', () => {
        const photoId = '23'

        const tags = [
            { id: '123' },
            { id: '11' }
        ]

        const expectedAction = {
            type: types.UPDATE_TAGS,
            payload: {
                photoId,
                tags
            }
        }

        expect(actions.updateTags(photoId, tags)).toEqual(expectedAction)
    })

    it('should create an update comments action', () => {
        const photoId = '23'

        const comments = [
            { id: '123' },
            { id: '11' }
        ]

        const expectedAction = {
            type: types.UPDATE_COMMENTS,
            payload: {
                photoId,
                comments
            }
        }

        expect(actions.updateComments(photoId, comments)).toEqual(expectedAction)
    })

    it('should create an add photo action', () => {
        const expectedAction = {
            type: types.ADD_PHOTO
        }

        expect(actions.addPhoto()).toEqual(expectedAction)
    })
})
