import React from 'react'

import { Comment } from './'

export const Comments = (props) => {
    const { comments } = props

    return (comments && comments.length > 0) &&
        <>
        {comments.reverse().map(comment => <Comment key={comment._id} comment={comment} />)}
        </>
}
