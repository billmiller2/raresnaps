import React from 'react'
import styled from 'styled-components'

import { decodeHtml } from '../../common'

export const Div = styled.div`
    border: 1px solid #f3e9e3;
    color: #a17188;
`
export const Small = styled.small`
    display: block;
    padding-left: 15px;
    padding-top: 5px;
`
export const CommentDiv = styled.div`
    padding: 15px;
    padding-top: 10px;
`

export const Comment = (props) => {
    const { comment } = props

    return comment && (
        <Div className='mr-1 mb-3'>
            <Small>
                {
                    new Date(comment.createdAt).toLocaleDateString('en-US', {
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                }
            </Small>
            <CommentDiv>
                {decodeHtml(comment.comment)}
            </CommentDiv>
        </Div>
    )
}
