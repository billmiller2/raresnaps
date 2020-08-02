import {
    REQUEST_PHOTO,
    RECEIVE_PHOTO,
    REQUEST_PHOTOS,
    RECEIVE_PHOTOS
} from './'
import { PHOTO, PHOTOS } from '../routes'

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

export const fetchPhotos = () =>
    (dispatch) => {
        dispatch(requestPhotos())

        return fetch(PHOTOS)
            .then(response => response.json())
            .then(photos => dispatch(receivePhotos(photos)))
    }

export const requestPhotos = () => {
    return {
        type: REQUEST_PHOTOS
    }
}

export const receivePhotos = (photos) => {
    return {
        type: RECEIVE_PHOTOS,
        payload: photos
    }
}
