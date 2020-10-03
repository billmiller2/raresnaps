import React, { useState } from 'react'
import * as Ladda from 'ladda'
import styled from 'styled-components'

import { Input, LightMauveButton } from '../../common'

const Form = styled.form`
    display: inline
`

export const SearchTag = (props) => {
    const { onSubmit } = props
    const [tag, setTag] = useState('')

    return (
        <Form 
            className='mr-2'
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
                Search Tag
            </LightMauveButton>
        </Form>
    )
}
