import React from 'react'

import { Comment } from './'

export const Comments = (props) => {
    const { comments } = props
    let commentComponents = []

    comments.forEach((comment, i) => {
        commentComponents.push(
            <Comment key={i} comment={comment} />
        )
    })

    return (
        <>{commentComponents}</>
    )
}
