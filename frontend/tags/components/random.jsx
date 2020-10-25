import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { fetchTags, randomTag } from '../'
import { Form, LightMauveButton } from '../../common'

export const RandomTag = (props) => {
    useEffect(() => {
        fetchTags()
    }, [])

    const { selected, tags } = props
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
