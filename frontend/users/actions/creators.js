import { REQUEST_USER, RECEIVE_USER} from './types'
import { USER } from '../routes'

export const fetchUser = () =>
    (dispatch) => {
        dispatch(requestUser())

        return fetch(USER)
            .then(response => response.json())
            .then(user => dispatch(receiveUser(user)))
    }

export const requestUser = () => {
    return {
        type: REQUEST_USER
    }
}

export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        payload: user
    }
}
