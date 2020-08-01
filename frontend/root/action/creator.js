import { REQUEST_USER, RECEIVE_USER} from './action'

// export const requestUser = function() {
//     return {
//         type: REQUEST_USER,
//         payload: {}
//     }
// }

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
