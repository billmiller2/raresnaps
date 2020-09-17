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
                    .then(() => setTag(''))
            }}>
            <input
                className='mr-2'
                onChange={(e) => setTag(e.target.value)}
                required
                type='text'
                value={tag}>
            </input>
            <LightMauveButton type="submit">
                Add Tag
            </LightMauveButton>
        </form>
    )
}

