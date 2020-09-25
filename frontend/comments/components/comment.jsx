import React from 'react'
import styled from 'styled-components'

import { decodeHtml } from '../../common'

export const Comment = (props) => {
    const { comment } = props

    return (
        <div className='mr-1 mb-1'>{decodeHtml(comment.comment)}</div>
    )
}
