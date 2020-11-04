import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actions from './creators.js'
import * as types from './types.js'
import { USER } from '../routes'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('creators', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('should create an request user action', () => {
        const expectedAction = {
            type: types.REQUEST_USER
        }

        expect(actions.requestUser()).toEqual(expectedAction)
    })

    it('should create a receive user action', () => {
        const user = { username: 'aaron' }

        const expectedAction = {
            type: types.RECEIVE_USER,
            payload: user
        }

        expect(actions.receiveUser(user)).toEqual(expectedAction)
    })

    it('creates RECEIVE_USER after user has been fetched', () => {
        const userId = '123'

        const user = {
            username: 'joshua'
        }

        const expectedPayload = {
            users: {
                [userId]: user
            }
        }

        fetchMock.getOnce(USER, {
            body: expectedPayload
        })

        const expectedActions = [
            { type: types.REQUEST_USER},
            { type: types.RECEIVE_USER, payload: expectedPayload },
        ]

        const store = mockStore({ users: {} })

        return store.dispatch(actions.fetchUser()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
