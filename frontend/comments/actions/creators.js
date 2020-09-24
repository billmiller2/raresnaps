import { 
    ADD_COMMENT, 
    REQUEST_COMMENTS,
    RECEIVE_COMMENTS,
    RECEIVE_COMMENT
} from './'
import { POST_COMMENT } from '../'

export const addComment = () => {
    return {
        type: ADD_COMMENT
    }
}

export const saveComment = (comment, photoId) =>
    (dispatch) => {
        return fetch(POST_COMMENT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    photoId: photoId,
                    comment: comment
                })
            })
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response)
                }

                return response.json()
            })
            .then(json => dispatch(receiveComment(json.photoId, json.comments)))
            //.then(response => {
                //if (response) {
                    //dispatch(updateTags(
                        //response.payload.photoId, 
                        //Object.keys(response.payload.tags)
                   //))
               //}
            //})
            .catch(error => alert(error.status + ' ' + error.statusText))
    }

export const receiveComment = (photoId, comments) => {
    return {
        type: RECEIVE_COMMENT,
        payload: {
            photoId: photoId,
            comments: comments
        }
    }
}
