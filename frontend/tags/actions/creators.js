import { 
    ADD_TAG, 
    REQUEST_TAGS,
    RECEIVE_TAGS,
    RECEIVE_TAG 
} from './'
import { POST_TAG, TAGS } from '../routes'

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
            .then(response => response.json())
            .then(tag => dispatch(receiveTag(tag)))
    }

export const receiveTag = (tags) => {
    return {
        type: RECEIVE_TAG,
        payload: tags
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
