import { RECEIVE_USER} from './types'
import { USER } from '../routes'

export const requestUser = () =>
    (dispatch) => fetch(USER)
        .then(response => response.json())
        .then(user => dispatch(receiveUser(user)))

export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        payload: user
    }
}
