import React, { useState } from 'react'
import * as Ladda from 'ladda'
import styled from 'styled-components'

import { LightMauveButton } from '../../common'

const Input = styled.input`
    &:required {
        box-shadow: none;
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

                return onSubmit(tag, photoId)
                    .then(() => {
                        submit.stop()
                        submit.remove()
                        setTag('')
                    })
            }}>
            <Input
                className='mr-2'
                onChange={(e) => setTag(e.target.value)}
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

