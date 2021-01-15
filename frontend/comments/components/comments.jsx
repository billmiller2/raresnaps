import React from 'react'
import { useSelector } from 'react-redux'

import { Comment } from './'

export const Comments = (props) => {
    const { photoId } = props

    const comments = useSelector(state => {
        const photo = state.photo.photos[photoId]
        let comments = []

        if (typeof photo !== 'undefined' && typeof photo.comments !== 'undefined') {
            photo.comments.forEach(commentId => {
                const comment = state.comment.comments[commentId]

                if (typeof comment !== 'undefined') {
                    comments.push(comment)
                }
            })
        }

        return comments
    })

    return (comments && comments.length > 0) &&
        <>
        {comments.reverse().map(comment => <Comment key={comment._id} comment={comment} />)}
        </>
}
