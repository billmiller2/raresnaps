import { RECEIVE_PHOTO } from './'
import { PHOTO } from '../routes'

export const requestPhoto = () =>
    (dispatch) => fetch(PHOTO)
        .then(response => response.json())
        .then(photo => dispatch(receivePhoto(photo)))

export const receivePhoto = (photo) => {
    return {
        type: RECEIVE_PHOTO,
        payload: photo
    }
}
