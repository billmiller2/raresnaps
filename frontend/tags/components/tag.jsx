import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { decodeHtml, LightMauveButton } from '../../common'

export const Tag = (props) => {
    const { tag, onClick, dismissible } = props

    return tag && (
        <Link to='/'>
            <LightMauveButton
                className='mr-1 mb-1'
                onClick={() => onClick(tag._id) }>
                { dismissible && decodeHtml('&#10006;  ') }
                { decodeHtml(tag.name) }
            </LightMauveButton>
        </Link>
    )
}
