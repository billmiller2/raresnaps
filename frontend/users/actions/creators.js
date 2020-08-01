import { RECEIVE_USER} from './types'

export const requestUser = () =>
    (dispatch) => fetch('/users/user')
        .then(response => response.json())
        .then(user => dispatch(receiveUser(user)))

export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        payload: user
    }
}
