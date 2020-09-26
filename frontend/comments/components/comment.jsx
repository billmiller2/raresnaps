import React from 'react'
import styled from 'styled-components'

import { decodeHtml } from '../../common'

const Div = styled.div`
    border: 1px solid #f3e9e3;
    color: #a17188;
`
const Small = styled.small`
    display: block;
    padding-left: 15px;
    padding-top: 5px;
`
const CommentDiv = styled.div`
    padding: 15px;
    padding-top: 10px;
`

export const Comment = (props) => {
    const { comment } = props
    const createdAt = new Date(comment.createdAt)
    const options = { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }

    const created = createdAt.toLocaleDateString('en-US', options)

    return (
        <Div className='mr-1 mb-3'>
            <Small>
                {created}
            </Small>
            <CommentDiv>
                {decodeHtml(comment.comment)}
            </CommentDiv>
        </Div>
    )
}
