import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { fetchTags, selectTag } from '../'
import { LightMauveButton } from '../../common'

export const Form = styled.form`
    display: inline;
    overflow: hidden;
    white-space: nowrap;
`

export const TagOfDay = () => {
    const tagOfDay = useSelector(state =>
        Object.values(state.tag.tags).find(tag => tag.isTagOfDay) || ''
    )
    const dispatch = useDispatch()

    return (
        <Form
            className='mr-2'
            onSubmit={(e) => {
                e.preventDefault()

                return dispatch(selectTag(tagOfDay._id))
            }}>
            <LightMauveButton
                className='ladda-button'
                data-style='expand-right'
                type="submit">
                The Tag of the Day is { tagOfDay ? tagOfDay.name : ''}
            </LightMauveButton>
        </Form>
    )
}
