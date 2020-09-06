import React, { useState } from 'react'

import { LightMauveButton } from '../../common'

export const AddTag = (props) => {
    const { onSubmit, photoId } = props
    const [tag, setTag] = useState('')

    return (
        <form 
            onSubmit={(e) => {
                e.preventDefault()

                return onSubmit(tag, photoId)
            }}>
            <input
                className='mr-2'
                type='text'
                onChange={(e) => setTag(e.target.value)}>
            </input>
            <LightMauveButton type="submit">
                Add Tag
            </LightMauveButton>
        </form>
    )
}

