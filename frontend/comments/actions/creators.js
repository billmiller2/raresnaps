const queryString = require('query-string')

import { 
    ADD_COMMENT, 
    REQUEST_COMMENTS,
    RECEIVE_COMMENTS,
    RECEIVE_COMMENT
} from './'
import { COMMENTS, POST_COMMENT } from '../'
import { updateComments } from '../../photos'

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
            .then(response => {
                if (response) {
                    dispatch(updateComments(
                        response.payload.photoId, 
                        Object.keys(response.payload.comments)
                   ))
               }
            })
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

export const receiveComments = (comments) => {
    return {
        type: RECEIVE_COMMENTS,
        payload: comments
    }
}

export const requestComments = () => {
    return {
        type: REQUEST_COMMENTS,
    }
}

export const fetchComments = (comments) =>
    (dispatch) => {
        dispatch(requestComments())

        const query = queryString.stringify({ comments }, { arrayFormat: 'bracket' })

        return fetch(COMMENTS + '?' + query)
            .then(response => response.json())
            .then(comments => dispatch(receiveComments(comments)))
    }
