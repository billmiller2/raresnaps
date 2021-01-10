import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { fetchTags, randomTag } from '../'
import { Form, LightMauveButton } from '../../common'

export const RandomTag = () => {
    useEffect(() => {
        fetchTags()
    }, [])

    const selected = useSelector(state => state.tag.selected)
    const tags = useSelector(state => state.tag.tags)
    const dispatch = useDispatch()

    return (
        <Form
            className='mr-2'
            onSubmit={(e) => {
                e.preventDefault()

                return dispatch(randomTag(tags, selected))
            }}>
            <LightMauveButton
                className='ladda-button'
                data-style='expand-right'
                id='randomTagButton'
                type="submit">
                Try a Random Tag
            </LightMauveButton>
        </Form>
    )
}
