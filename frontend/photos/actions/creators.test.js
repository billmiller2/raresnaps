import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actions from './creators.js'
import * as types from './types.js'
import { PHOTO, PHOTOS, UPLOAD_PHOTO } from '../routes'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('creators', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates RECEIVE_PHOTO after photo has been fetched', () => {
        const photoId = '123'

        const photo = {
            comments: [],
            data: 'someBase64',
            tags: []
        }

        const expectedPayload = {
            photos: {
                [photoId]: photo
            }
        }

        fetchMock.getOnce(PHOTO + photoId, {
            body: expectedPayload
        })

        const expectedActions = [
            { type: types.REQUEST_PHOTO },
            { type: types.RECEIVE_PHOTO, payload: expectedPayload },
        ]

        const store = mockStore({ photos: {} })

        return store.dispatch(actions.fetchPhoto(photoId)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

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

    it('creates RECEIVE_PHOTOS after photo has been fetched', () => {
        const photoId = '123'
        const anotherId = '321'

        const photo = {
            comments: [],
            data: 'someBase64',
            tags: []
        }

        const anotherPhoto = {
            comments: [{ id: 'asdf' }],
            data: 'anotherBase64',
            tags: []
        }

        const expectedPayload = {
            photos: {
                [photoId]: photo,
                [anotherId]: anotherPhoto
            }
        }

        fetchMock.getOnce(PHOTOS, {
            body: expectedPayload
        })

        const expectedActions = [
            { type: types.REQUEST_PHOTOS },
            { type: types.RECEIVE_PHOTOS, payload: expectedPayload },
        ]

        const store = mockStore({ photos: {} })

        return store.dispatch(actions.fetchPhotos()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('creates RECEIVE_PHOTOS after photo has been fetched with since param', () => {
        const photoId = '123'
        const anotherId = '321'

        const photo = {
            comments: [],
            data: 'someBase64',
            tags: []
        }

        const anotherPhoto = {
            comments: [{ id: 'asdf' }],
            data: 'anotherBase64',
            tags: []
        }

        const expectedPayload = {
            photos: {
                [photoId]: photo,
                [anotherId]: anotherPhoto
            }
        }

        const since = '2012'

        fetchMock.getOnce(PHOTOS + '?since=' + since, {
            body: expectedPayload
        })

        const expectedActions = [
            { type: types.REQUEST_PHOTOS },
            { type: types.RECEIVE_PHOTOS, payload: expectedPayload },
        ]

        const store = mockStore({ photos: {} })

        return store.dispatch(actions.fetchPhotos(since)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('creates RECEIVE_PHOTOS after photo has been fetched with tagIds param', () => {
        const photoId = '123'
        const anotherId = '321'

        const photo = {
            comments: [],
            data: 'someBase64',
            tags: []
        }

        const anotherPhoto = {
            comments: [{ id: 'asdf' }],
            data: 'anotherBase64',
            tags: []
        }

        const expectedPayload = {
            photos: {
                [photoId]: photo,
                [anotherId]: anotherPhoto
            }
        }

        const tagId = '11'
        const anotherTagId = '21'

        const tagIds = [tagId, anotherTagId]

        fetchMock.getOnce(PHOTOS + `?tags[]=${tagId}&tags[]=${anotherTagId}`, {
            body: expectedPayload
        })

        const expectedActions = [
            { type: types.REQUEST_PHOTOS },
            { type: types.RECEIVE_PHOTOS, payload: expectedPayload },
        ]

        const store = mockStore({ photos: {} })

        return store.dispatch(actions.fetchPhotos(null, tagIds)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('creates RECEIVE_PHOTOS after photo has been fetched with since and tagIds param', () => {
        const photoId = '123'
        const anotherId = '321'

        const photo = {
            comments: [],
            data: 'someBase64',
            tags: []
        }

        const anotherPhoto = {
            comments: [{ id: 'asdf' }],
            data: 'anotherBase64',
            tags: []
        }

        const expectedPayload = {
            photos: {
                [photoId]: photo,
                [anotherId]: anotherPhoto
            }
        }

        const since = '2020'
        const tagId = '11'
        const anotherTagId = '21'

        const tagIds = [tagId, anotherTagId]

        fetchMock.getOnce(PHOTOS + `?since=${since}&tags[]=${tagId}&tags[]=${anotherTagId}`, {
            body: expectedPayload
        })

        const expectedActions = [
            { type: types.REQUEST_PHOTOS },
            { type: types.RECEIVE_PHOTOS, payload: expectedPayload },
        ]

        const store = mockStore({ photos: {} })

        return store.dispatch(actions.fetchPhotos(since, tagIds)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
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

    it('creates RECEIVE_PHOTOS after photo has been uploaded', () => {
        const photoId = '123'

        const photo = {
            comments: [],
            data: 'someBase64',
            tags: []
        }

        const expectedPayload = {
            photos: {
                [photoId]: photo
            }
        }

        const file = 'someFile.jpg'

        fetchMock.postOnce(UPLOAD_PHOTO, {
            body: expectedPayload
        })

        const expectedActions = [
            { type: types.ADD_PHOTO},
            { type: types.RECEIVE_PHOTO, payload: expectedPayload },
        ]

        const store = mockStore({ photos: {} })

        return store.dispatch(actions.uploadPhoto(file)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should create an add photo action', () => {
        const expectedAction = {
            type: types.ADD_PHOTO
        }

        expect(actions.addPhoto()).toEqual(expectedAction)
    })
})
