import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actions from './creators.js'
import * as types from './types.js'
import { POST_TAG, SEARCH, TAGS } from '../routes'
import { UPDATE_TAGS } from '../../photos/'

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

    it('should create a random tag action', () => {
        const iversonId = '3'
        const selected = iversonId
        const tags = {
            ['23']: {
                name: 'jordan'
            },
            ['45']: {
                name: 'mitchell'
            },
            [iversonId]: {
                name: 'iverson'
            }
        }
        const store = mockStore({ tags: tags })

        store.dispatch(actions.randomTag(tags, selected))

        expect(store.getActions()[0].type).toEqual(types.SELECT_TAG)
        expect(store.getActions()[0].payload).not.toEqual('')
    })

    it('searches and returns tag if found', () => {
        const tagId = '123'

        const tag = {
            tagId: tagId,
            name: 'utes'
        }

        fetchMock.getOnce(SEARCH + tag.name, {
            body: tag
        })

        const expectedActions = [
            { type: types.SELECT_TAG, payload: tagId },
        ]

        const store = mockStore({ tags: {} })

        return store.dispatch(actions.searchTag(tag.name)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('searches and alerts if tag not found', () => {
        const tagId = '123'

        const tag = {
            tagId: tagId,
            name: 'utes'
        }

        fetchMock.getOnce(SEARCH + tag.name, {
            body: {}
        })

        const store = mockStore({ tags: {} })

        jest.spyOn(window, 'alert').mockImplementation(() => {})

        return store.dispatch(actions.searchTag(tag.name)).then(() => {
            expect(store.getActions()).toEqual([])
            expect(window.alert).toBeCalledWith('Tag not found')
        })
    })

    it('saves a new tag', () => {
        const tagId = '123'

        const tag = {
            tagId: tagId,
            name: 'utes'
        }

        const photoId = '232'

        fetchMock.postOnce(POST_TAG, {
            body: {
                photoId: photoId,
                tags: {
                    [tagId]: tag
                }
            }
        })

        const store = mockStore({ tags: {} })

        const expectedActions = [
            {
                type: types.RECEIVE_TAG,
                payload: {
                    photoId: photoId,
                    tags: {
                        [tagId]: tag
                    }
                }
            },
            {
                type: UPDATE_TAGS,
                payload: {
                    photoId: photoId,
                    tags: [tagId]
                }
            }
        ]

        return store.dispatch(actions.saveTag(tag, photoId)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('handles error when saving tag', () => {
        const tagId = '123'

        const tag = {
            tagId: tagId,
            name: 'utes'
        }

        const photoId = '232'
        fetchMock.postOnce(POST_TAG, 500)

        const store = mockStore({ tags: {} })

        jest.spyOn(window, 'alert').mockImplementation(() => {})

        return store.dispatch(actions.saveTag(tag, photoId)).then(() => {
            expect(store.getActions()).toEqual([])
            expect(window.alert).toBeCalledWith('500 Internal Server Error')
        })
    })

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
