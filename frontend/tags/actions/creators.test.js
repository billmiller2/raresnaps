import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actions from './creators.js'
import * as types from './types.js'
import { TAGS } from '../routes'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('creators', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('should create an add tag action', () => {
        const expectedAction = {
            type: types.ADD_TAG
        }

        expect(actions.addTag()).toEqual(expectedAction)
    })

    it('should create a select tag action', () => {
        const tagId = '123'

        const expectedAction = {
            type: types.SELECT_TAG,
            payload: tagId
        }

        expect(actions.selectTag(tagId)).toEqual(expectedAction)
    })

    it('should create a remove selected tag action', () => {
        const tagId = '123'

        const expectedAction = {
            type: types.REMOVE_SELECTED_TAG,
            payload: tagId
        }

        expect(actions.removeSelectedTag(tagId)).toEqual(expectedAction)
    })

    // random tag test
    // search tag test
    // save tag test

    it('should create a recieve tag action', () => {
        const photoId = '123'
        const tags = [
            { id: 'asdf' }
        ]

        const expectedAction = {
            type: types.RECEIVE_TAG,
            payload: {
                photoId,
                tags
            }
        }

        expect(actions.receiveTag(photoId, tags)).toEqual(expectedAction)
    })

    it('should create a recieve tags action', () => {
        const tagId = '123asd'

        const tags = {
            [tagId]: {
                name: 'vegas'
            }
        }

        const expectedAction = {
            type: types.RECEIVE_TAGS,
            payload: tags
        }

        expect(actions.receiveTags(tags)).toEqual(expectedAction)
    })

    it('should create a request tags action', () => {
        const expectedAction = {
            type: types.REQUEST_TAGS
        }

        expect(actions.requestTags()).toEqual(expectedAction)
    })

    it('creates RECEIVE_TAGS after tags have been fetched', () => {
        const tagId = '123'

        const tag = { 
            name: 'utes'
        }

        const anotherTagId = '321'

        const anotherTag = { 
            name: 'utah'
        }

        const expectedPayload = {
            tags: {
                [tagId]: tag,
                [anotherTagId]: anotherTag
            }
        }

        fetchMock.getOnce(TAGS, {
            body: expectedPayload
        })

        const expectedActions = [
            { type: types.REQUEST_TAGS },
            { type: types.RECEIVE_TAGS, payload: expectedPayload },
        ]

        const store = mockStore({ tags: {} })

        return store.dispatch(actions.fetchTags()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
