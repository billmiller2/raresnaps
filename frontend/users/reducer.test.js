import { usersReducer, initialState } from './reducer'
import * as actions from './actions/creators'

describe('users reducer', () => {
    it('should return the initial state', () => {
        expect(usersReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle REQUEST_USER', () => {
        expect(usersReducer(undefined, actions.requestUser())).toEqual({
            username: '',
            isFetching: true
        })
    })

    it('should handle RECEIVE_USER', () => {
        const user = {
            username: 'bill'
        }

        expect(usersReducer(undefined, actions.receiveUser(user))).toEqual({
            username: user.username,
            isFetching: false
        })
    })
})

