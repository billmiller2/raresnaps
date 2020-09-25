import React from 'react'
import styled from 'styled-components'

import { decodeHtml } from '../../common'

const Div = styled.div`
    border: 1px solid #f3e9e3;
    color: #a17188;
    padding: 15px;
`

export const Comment = (props) => {
    const { comment } = props

    return (
        <Div className='mr-1 mb-3'>{decodeHtml(comment.comment)}</Div>
    )
}
