import { ADD_TAG, RECEIVE_TAG } from './'
import { POST_TAG } from '../routes'

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
