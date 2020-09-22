import React, { useState } from 'react'
import * as Ladda from 'ladda'
import styled from 'styled-components'

import { LightMauveButton } from '../../common'

const Input = styled.input`
    color: #a17188 !important;
    padding: 3px;
    &:required {
        box-shadow: none;
    }
    &:focus {
        border-color: #ffffff !important;
        box-shadow: 0 0 5px !important;
        outline: none;
    }
    &::selection {
        background-color: #a17188;
        color: #ffffff;
    }
`

export const AddTag = (props) => {
    const { onSubmit, photoId } = props
    const [tag, setTag] = useState('')

    return (
        <form 
            onSubmit={(e) => {
                e.preventDefault()
                const submit = Ladda.create(document.querySelector('#addTagButton'))
                submit.start()

                return onSubmit(tag.trim(), photoId)
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
                id='addTagButton' 
                type="submit">
                Add Tag
            </LightMauveButton>
        </form>
    )
}

