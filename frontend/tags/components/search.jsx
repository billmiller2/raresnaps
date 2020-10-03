import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Ladda from 'ladda'
import styled from 'styled-components'

import { searchTag } from '../'
import { Input, LightMauveButton } from '../../common'

const Form = styled.form`
    display: inline;
    overflow: hidden;
    white-space: nowrap;
`

export const SearchTag = (props) => {
    const [tag, setTag] = useState('')
    const dispatch = useDispatch()

    return (
        <Form 
            className='mr-2'
            onSubmit={(e) => {
                e.preventDefault()
                const submit = Ladda.create(document.querySelector('#searchTagButton'))
                submit.start()

                return dispatch(searchTag(tag.trim()))
                    .then(() => {
                        submit.stop()
                        submit.remove()
                        setTag('')
                    })
            }}>
            <Input
                className='mr-2'
                onChange={(e) => setTag(e.target.value.trimLeft())}
                required
                type='text'
                value={tag}>
            </Input>
            <LightMauveButton 
                className='ladda-button'
                data-style='expand-right'
                id='searchTagButton' 
                type="submit">
                Search Tag
            </LightMauveButton>
        </Form>
    )
}
