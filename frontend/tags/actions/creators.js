import { 
    ADD_TAG, 
    REQUEST_TAGS,
    RECEIVE_TAGS,
    RECEIVE_TAG 
} from './'
import { POST_TAG, TAGS } from '../routes'
import { updateTags } from '../../photos'

export const addTag = () => {
    return {
        type: ADD_TAG
    }
}
export const saveTag = (tag, photoId) =>
    (dispatch) => {
        return fetch(POST_TAG, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    photoId: photoId,
                    tag: tag
                })
            })
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response)
                }

                return response.json()
            })
            .then(json => {
                if (Object.keys(json.tags).length === 0) {
                    return false
                }

                return dispatch(receiveTag(json.photoId, json.tags))
            })
            .then(response => {
                if (response) {
                    dispatch(updateTags(
                        response.payload.photoId, 
                        Object.keys(response.payload.tags)
                   ))
               }
            })
            .catch(error => alert(error.status + ' ' + error.statusText))
    }

export const receiveTag = (photoId, tags) => {
    return {
        type: RECEIVE_TAG,
        payload: {
            photoId: photoId,
            tags: tags
        }
    }
}

export const receiveTags = (tags) => {
    return {
        type: RECEIVE_TAGS,
        payload: tags
    }
}

export const requestTags = () => {
    return {
        type: REQUEST_TAGS
    }
}

export const fetchTags = () =>
    (dispatch) => {
        dispatch(requestTags())

        return fetch(TAGS)
            .then(response => response.json())
            .then(tags => dispatch(receiveTags(tags)))
    }