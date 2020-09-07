import {
    REQUEST_PHOTO,
    RECEIVE_PHOTO,
    REQUEST_PHOTOS,
    RECEIVE_PHOTOS,
    ADD_PHOTO,
    UPDATE_TAGS
} from './'
import {
    PHOTO,
    PHOTOS,
    UPLOAD_PHOTO
} from '../routes'

export const fetchPhoto = (photoId) =>
    (dispatch) => {
        dispatch(requestPhoto())

        return fetch(PHOTO + photoId)
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

export const fetchPhotos = (since) =>
    (dispatch) => {
        dispatch(requestPhotos(since))
        
        let url = PHOTOS

        if (since) {
            url += '?since=' + since
        }

        return fetch(url)
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

export const uploadPhoto = (file) =>
    (dispatch) => {
        dispatch(addPhoto())
        const formData = new FormData()
        formData.append('photo', file)

        return fetch(UPLOAD_PHOTO, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(photo => dispatch(receivePhoto(photo)))
    }

export const addPhoto = () => {
    return {
        type: ADD_PHOTO
    }
}

export const updateTags = (photoId, tags) => {
    return {
        type: UPDATE_TAGS,
        payload: {
            photoId: photoId,
            tags: tags
        }
    }
}
