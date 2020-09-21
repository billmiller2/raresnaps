import React from 'react'
import styled from 'styled-components'

import { decodeHtml } from '../../common'

const Span = styled.span`
    background-color: #ffffff;
    border: 1px solid;
    border-radius: 5px;
    color: #a17188;
    display: inline-block;
    padding: 5px;
    white-space: pre;
`

export const Tag = (props) => {
    const { tag } = props

    return (
        <Span className='mr-1 mb-1'>{decodeHtml(tag.name)}</Span>
    )
}
