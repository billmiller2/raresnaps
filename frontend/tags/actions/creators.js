import { ADD_TAG } from './'
import { POST_TAG } from '../routes'

export const addTag = () => {
    return {
        type: ADD_TAG
    }
}
export const saveTag = (tag) =>
    (dispatch) => {
        return fetch(POST_TAG, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({tag: tag})
            })
            .then(response => response.json())
            //.then(tag => dispatch(receiveTag(tag)))
    }
