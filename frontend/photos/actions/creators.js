const queryString = require('query-string')

import {
    REQUEST_PHOTO,
    RECEIVE_PHOTO,
    REQUEST_PHOTOS,
    RECEIVE_PHOTOS,
    ADD_PHOTO,
    UPDATE_TAGS,
    UPDATE_COMMENTS
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

export const fetchPhotos = (since, tagIds) =>
    (dispatch) => {
        dispatch(requestPhotos(since))
        
        let params = {}

        if (since) {
            params.since = since
        }

        if (tagIds) {
            params.tags = []

            tagIds.forEach(tagId => {
                params.tags.push(tagId)
            })
        }

        const query = queryString.stringify(params, { arrayFormat: 'bracket' })

        return fetch(PHOTOS + '?' + query)
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

export const updateComments = (photoId, comments) => {
    return {
        type: UPDATE_COMMENTS,
        payload: {
            photoId: photoId,
            comments: comments
        }
    }
}
