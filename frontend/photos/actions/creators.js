import { REQUEST_PHOTO, RECEIVE_PHOTO } from './'
import { PHOTO } from '../routes'

export const fetchPhoto = () =>
    (dispatch) => {
        dispatch(requestPhoto())

        return fetch(PHOTO)
            .then(response => response.json())
            .then(photo => dispatch(receivePhoto(photo)))
    }

export const requestPhoto = () => {
    return {
        type: REQUEST_PHOTO
    }
}

export const receivePhoto = (photo) => {
    return {
        type: RECEIVE_PHOTO,
        payload: photo
    }
}
